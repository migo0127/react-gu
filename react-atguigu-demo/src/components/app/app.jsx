import React,{Component} from 'react'
import PubSub from 'pubsub-js'

import CommentAdd from '../comment-add/comment-add'
import CommentList from '../comment-list/comment-list'

export default class App extends Component{
    
    state = {
        comments:[
            {username:'Tom',content:'React挺好的！'},
            {username:'Jack',content:'React太难了！'}
        ]
    }

    //添加评论
    addComment = (comment) =>{
        const {comments} = this.state
        comments.unshift(comment)
        //更新状态 △
        this.setState({comments})
    }

    // 删除指定评论
    // deleteComment = (index)=>{
    //     const {comments} = this.state
    //     //删除
    //     comments.splice(index,1)
    //     //添加
    //     //comments.splice(index,0,{})
    //     //修改
    //     //comments.splice(index,1,{})
    //     //更新状态 △
    //     this.setState({comments})
    // }

    componentDidMount() {
        PubSub.subscribe('delete',(message,index) => {
            const {comments} = this.state
            //删除
            comments.splice(index,1)
            //更新状态 △
            this.setState({comments})
        })
    }


    render(){
        const {comments} = this.state

        return(
            <div>
                <header className="site-header jumbotron">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <h1>请发表对React的评论</h1>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <div className="row">
                        <CommentAdd addComment={this.addComment}/>
                        <CommentList comments={comments}/>
                    </div>
                </div>
            </div>
        )
    }

}
