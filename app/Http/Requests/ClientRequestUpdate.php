<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ClientRequestUpdate extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $id = $this->route('client')['id'];

        return [
                'name' => ['required', ' min:2', 'max:255'],
                'email' => [
                        'required',
                        'email',
                        Rule::unique('clients')->where(function ($query) use ($id) {
                            return $query->where('admin_id', auth()->id())
                                    ->where('id', '!=', $id);
                        }),
                ],
                'profile' => ['nullable', 'image'],
        ];
    }
}
