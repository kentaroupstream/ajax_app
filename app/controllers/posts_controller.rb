class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")
  end

  def create
    Post.create(content: params[:content])
    post = Post.create(content: params[:content], checked: false)     #最初から既読/未読のchecked属性を「false/未読」で付与するようにした！
    render json:{ post: post }    #非同期通信(リロードしない)ので、リダイレクトではなくJSON形式で直接データを読み込む方法にした。
  end

  def checked
    post = Post.find(params[:id])
    if post.checked
      post.update(checked: false)
    else
      post.update(checked: true)
    end
    
    item = Post.find(params[:id])
    render json: { post: item }
  end

end