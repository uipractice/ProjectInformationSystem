import React from 'react'

export default function ShowFiles(props) {
    return (
        <div
            className={`${props.fileData.length <= 0 && 'no-selected-items'}
                          ${props.fileData.length > 0 && "selected-items"}`}>
            {props.fileData &&
                props.fileData.map((item, key) => (
                    <span
                        key={key}
                        className='file-close-icon'
                        onClick={() => {
                            props.handleFile(key)
                        }}
                    >
                        {props.fileData[key].name}
                        &nbsp;&nbsp;
                    </span>
                ))}
        </div>
    )
}
