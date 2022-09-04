<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;

class ClientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array|Arrayable|JsonSerializable
     */
    public function toArray($request)
    {
        return [
                'id' => $this->id,
                'name' => $this->name,
                'email' => $this->email,
                'profile' => $this->profile_url,
                'admin_id' => $this->admin_id,
                'admin' => [
                        'name' => $this->admin->name ?? '',
                        'email' => $this->admin->email ?? '',
                ],
                'created_at' => $this->created_at->toFormattedDayDateString()
        ];
    }
}
