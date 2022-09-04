<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Storage;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
            'admin_id',
            'name',
            'email',
            'profile',
    ];

    protected $appends = ['profile_url'];

    // ******************* Getters *******************

    public function getProfileUrlAttribute(): string
    {
        if ($this->profile) {
            if (Storage::exists('profiles/' . $this->profile)) {
                return Storage::url('profiles/' . $this->profile);
            }
        }

        return asset('images/no_image.png');
    }

    // ******************* Relations *******************

    public function admin(): BelongsTo
    {
        return $this->belongsTo(Admin::class);
    }
}
