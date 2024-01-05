import { useState, useEffect, useRef } from "react"
import {XMarkIcon, BookmarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import {BookmarkIcon as BookmarkIconSolid, PencilSquareIcon as PencilSquareIconSolid} from '@heroicons/react/24/solid'


export default function Note({highestZIndex,setHighestZIndex, onClose}) {
    const [allowMove, setAllowMove] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const NoteRef = useRef();
    const textareaRef = useRef(null);
    const [dx, setDx] = useState(0)
    const [dy, setDy] = useState(0)

    function handleMouseDown(e) {
        setAllowMove(true)
        const position = NoteRef.current.getBoundingClientRect()
        setDx(e.clientX - position.x)
        setDy(e.clientY - position.y)
    }


    function handleMouseMove(e) {
        if (allowMove && !isPinned) {

            const x = e.clientX - dx
            const y = e.clientY - dy
            
            const maxX = window.innerWidth - NoteRef.current.clientWidth;
            const maxY = window.innerHeight - NoteRef.current.clientHeight;
    
            const clampedX = Math.max(0, Math.min(x, maxX));
            const clampedY = Math.max(0, Math.min(y, maxY));
                
            NoteRef.current.style.left = clampedX + "px";
            NoteRef.current.style.top = clampedY + "px";
        }
    }

    function handleMouseUp() {
        setAllowMove(false)
    }

    function onPin(){
        setIsPinned((prev) => !prev);
        isPinned ? NoteRef.current.style.zIndex = 1000 :
        NoteRef.current.style.zIndex = highestZIndex;
    }

    function onEdit() {
        setIsEditing(true);

        if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(0, 0); 
        }
    }

    function onSave() {
        setIsEditing(false);
    }

    return (
        <div className="bg-[#FFFF3B] sticky-note w-[300px] absolute top-[30px] left-[50px]" ref={NoteRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onClick={() => {
                setHighestZIndex(highestZIndex + 1);
                isPinned ? NoteRef.current.style.zIndex = 1000 :
                NoteRef.current.style.zIndex = highestZIndex;
            }}
            >
            <div className=" flex justify-between cursor-move">

                <div className="cursor-pointer" onClick={onPin}>
                    {isPinned ? <BookmarkIconSolid className="w-5 my-4 ml-4"/> :<BookmarkIcon className="w-5 my-4 ml-4"/>}
                </div>

                <div className="cursor-pointer " onClick={onClose}>
                    <XMarkIcon className="w-5 my-4 mr-4"/>
                </div>
                
            </div>
            <textarea ref={textareaRef} className='pl-5 outline-none border-none resize-none bg-[#FFFF3B] text-black' cols="24" rows="5"></textarea>
            
            <div className="cursor-pointer " >
                {isEditing ? <PencilSquareIconSolid onClick={onSave} className="w-5 my-4 ml-4"/> :<PencilSquareIcon onClick={onEdit} className="w-5 my-4 ml-4"/>}
            </div>
        </div>
    )
}