<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RoleRedirectMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) return $next($request);

        $user = Auth::user();

        switch ($user->role) {
            case 'superadmin':
                return redirect()->route('dashboard.superadmin.index');
            case 'admin':
                return redirect()->route('dashboard.admin.index');
            case 'user':
                return redirect()->route('dashboard.user.index');
            case 'monitor':
                return redirect()->route('dashboard.monitor.index');
            default:
                abort(403);
        }
    }
}
