import {CommentType} from "../../types";
import style from "./style.module.css"
import React, {useState} from "react";
import {FaRegArrowAltCircleDown, FaRegArrowAltCircleUp} from "react-icons/fa";

const Comment = ({
                     comment,
                     showSubComments,
                     parent = false
                 }: { comment: CommentType, showSubComments?: number, parent?: boolean }) => {

    /**
     * showChildren is used to render child comments the higher the number that you set the more subComments will load on one click
     */
    const [showChildren, setShowChildren] = useState(showSubComments ? showSubComments : 0);

    /**
     * validates if the comment is a link in order to render a <img src={comment.comment}/> tag
     * @param string
     */
    function isValidURL(string: string) {
        const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    };

    return (
        <div className={style.commentContainer}>
            <div className={style.comment}>
                <div className={style.author}>
                    {comment.author}
                </div>
                <div>
                    {isValidURL(comment.comment) ?
                        <img style={{maxHeight: "70px", objectFit: "contain"}} src={comment.comment}
                             alt="Couldn't load comment"/> : <div>
                            {comment.comment}
                        </div>}
                </div>
                <div className={style.actions}>
                    <div className={style.upvote}>
                        <FaRegArrowAltCircleUp/>
                        <div style={{marginLeft:"5px"}}>
                            {comment.ups}
                        </div>
                    </div>
                    <FaRegArrowAltCircleDown className={style.downVote} />
                </div>
            </div>

            {(showChildren !== 0 && parent) && <div className={style.loadComments} onClick={() => setShowChildren(0)}>
                Hide Comments
            </div>}
            {showChildren !== 0 &&
            <div className={style.subComment}>
                {comment.children.map((subComment: CommentType) => {
                    return (
                        <div key={subComment.id} style={{marginTop: "5px"}}>
                            <Comment comment={subComment} showSubComments={showChildren - 1}/>
                        </div>
                    )
                })}
            </div>}

            {(comment?.children?.length > 0 && showChildren === 0) &&
            <div className={style.loadComments} onClick={() => setShowChildren(1)}>
                Load more comments
            </div>}
        </div>
    )
}

export default Comment;