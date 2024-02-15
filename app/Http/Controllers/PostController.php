<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostStoreRequest;
use App\Models\Post;
use Dflydev\DotAccessData\Data;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use function Laravel\Prompts\select;

class PostController extends Controller
{
    public function index(){
        $posts = Post::all();
         return Inertia::render('Posts/All',[
            'posts'=>$posts
         ]);
    }
    public function create(){
        return Inertia::render('Posts/CreatePost');
    }

    public function store(Request $request){
        $request->validate([
            'title' => 'required',
            'body'=>'required',
            'user_id'=>'required'
        ]);
        Post::create([
            'title'=>$request->title,
            'body'=>$request->body,
            'user_id'=>$request->user_id
    ]);
    return redirect()->route('dashboard')->with('success','post created');
    }

    public function edit($id){
        $post = Post::find($id);
        $user = DB::table('users')->Where('id',$post->user_id)->pluck('name');
        return Inertia::render('Posts/Edit',[
            'post'=>$post,
            'user'=>$user
        ]);
    }
    public function update(Request $request , $id){
       $post = Post::find($id);
       $post->title = $request->input('title');
       $post->body = $request->input('body');
       $post->update();
       
        return redirect()->route('posts.index')->with("success",'updated');
    }
}
