import { EditorState, convertToRaw} from 'draft-js';
import React, {useState} from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function TextEditor({setTextEditorState}){
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
        const rawContentState = convertToRaw(editorState.getCurrentContent())
        setTextEditorState(rawContentState)
    }
    return (
        <div>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
            />
        </div>
    )
}