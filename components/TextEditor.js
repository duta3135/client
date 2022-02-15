import { EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import React, {useState} from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function TextEditor({setTextEditorState, initialState}){
    const convertedState = initialState ? convertFromRaw(JSON.parse(initialState)) : {}
    const initialEditorState = initialState ? EditorState.createWithContent(convertedState) : EditorState.createEmpty()
    const [editorState, setEditorState] = useState(initialEditorState)
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