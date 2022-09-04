<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClientRequestStore;
use App\Http\Requests\ClientRequestUpdate;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Http\Request;
use Storage;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $orderColumn = $request->input('order_column', 'id');
        $orderDirection = $request->input('order_direction', 'desc');
        $searchInput = $request->input('search');

        $columns = ['id', 'name', 'email', 'created_at'];

        if (!in_array($orderColumn, $columns)) {
            $orderColumn = 'name';
        }
        if (!in_array($orderDirection, ['asc', 'desc'])) {
            $orderDirection = 'asc';
        }

        $clients = Client::where('admin_id', auth()->id())
                ->when($searchInput, function ($q) use ($columns, $request) {
                    $q->where(function ($query) use ($columns, $request) {
                        foreach ($columns as $column) {
                            if ($column == $columns[0])
                                $query->where($column, 'like', '%' . $request->search . '%');
                            else
                                $query->orWhere($column, 'like', '%' . $request->search . '%');
                        }
                    });
                })
                ->orderBy($orderColumn, $orderDirection)
                ->paginate(10);

        return ClientResource::collection($clients);
    }

    public function store(ClientRequestStore $request)
    {
        $data = $request->validated();
        $data['admin_id'] = auth()->id();

        $client = Client::create($data);

        $imageName = $this->createImage($request, "");
        if (!empty($imageName))
            $client->update(['profile' => $imageName]);

        return new ClientResource($client);
    }

    public function show(Client $client)
    {
        if ($client->admin_id != auth()->id())
            return response()->json([], 400);

        return new ClientResource($client);
    }

    public function update(ClientRequestUpdate $request, Client $client)
    {
        if ($client->admin_id != auth()->id())
            return response()->json([], 400);

        $imageName = $client->profile;

        $client->update($request->only('name', 'email'));

        $imageName = $this->createImage($request, $imageName);
        if (!empty($imageName))
            $client->update(['profile' => $imageName]);

        return new ClientResource($client);
    }

    public function destroy(Client $client)
    {
        if ($client->admin_id != auth()->id())
            return response()->json([], 400);

        if (!empty($client->profile)) {
            if (Storage::exists('profiles/' . $client->profile)) {
                Storage::delete('profiles/' . $client->profile);
            }
        }

        $client->delete();

        return response()->noContent();
    }

    public function createImage($request, $imageName)
    {
        if ($request->hasFile('profile')) {
            $image = $request->file('profile');

            if (empty($imageName)) {
                $extension = $image->getClientOriginalExtension();
                $imageName = uniqid(auth()->id() . '_') . '.' . $extension;
            }

            if (Storage::put('profiles/' . $imageName, file_get_contents($image))) {
                return $imageName;
            }
        }

        return null;
    }
}
