import React, { useEffect, useState } from 'react'

function Drop() {


    const [imagedata, setImagedata] = useState("");
    const [error, setError] = useState(false);


    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        // console.log(e.dataTransfer.files[0].name)
        var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        if (e.dataTransfer.types == "Files" && allowedExtensions.exec(e.dataTransfer.files[0].name)) {
            // if (allowedExtensions.exec(e.dataTransfer.files[0].name)) {
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                var files = e.dataTransfer.files;
                if (files.length) {
                    var file = files[0];
                    var reader = new FileReader();
                    reader.onload = function () {
                        const img = reader.result;
                        setImagedata(img)
                    };
                    reader.readAsDataURL(file);
                }
            }
            // }
        } else setError(true)
    };

    const handleChange = function (e) {
        var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        if (allowedExtensions.exec(e.target.files[0].name)) {
            var files = e.target.files;
            if (files.length) {
                var file = files[0];
                var reader = new FileReader();
                reader.onload = function () {
                    const img = reader.result;
                    setImagedata(img)
                };
                reader.readAsDataURL(file);
            }
        } else setError(true)
    };


    var dragCount = 0
    function dragenterDragleave(e) {
        e.preventDefault();
        dragCount += (e.type === "dragenter" ? 1 : -1);
        if (dragCount === 1) {
            const overlay = document.getElementById('overlay');
            overlay.classList.add('show');
            // console.log(dragCount)
        }
        if (dragCount === 0) {
            const overlay = document.getElementById('overlay');
            overlay.classList.remove('show');
            // console.log(dragCount)
        }
        if (e.type === "drop") {
            const overlay = document.getElementById('overlay');
            overlay.classList.remove('show');
        }

    };
    useEffect(() => {
        window.addEventListener('dragenter', (e) => {
            dragenterDragleave(e);
        });

        window.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        window.addEventListener('dragleave', (e) => {
            dragenterDragleave(e)
        });

        window.addEventListener('drop', (e) => {
            dragenterDragleave(e);
            handleDrop(e)
        });
    }, [])


    return (
        <>
            <div className='d-flex flex-wrap'>
                <div className='overlay' id="overlay">
                    <h2 className='drop-text'>Drop image anywhare</h2>
                </div>
                <div>
                    <form id="form-file-upload" onSubmit={(e) => e.preventDefault()}>
                        <div id="label-file-upload" >
                            <div>
                                <input type="file" id="input-file-upload" multiple={true} onChange={handleChange} accept='.jpeg, .jpg, .png' />
                                <p>Drag and drop your file here or</p>
                                <label htmlFor="input-file-upload" className="upload-button" >Upload a file</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='img-preview'>
                    <img src={imagedata} alt="" />
                    {error && (
                        <>
                            {alert("File format is not supported Background Remove")}
                            {setError(false)}
                            {setImagedata("")}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Drop