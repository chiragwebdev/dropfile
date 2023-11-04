import React, { useEffect, useState } from 'react'
import Demo from './Demo';

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

    const samefunc = (files) => {
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


    const imagepaste = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        if (allowedExtensions.exec(e.clipboardData.files[0].name)) {
            var files = e.clipboardData.files;
            samefunc(files);
        } else setError(true)
    };

    const handleChange = function (e) {
        var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        if (allowedExtensions.exec(e.target.files[0].name)) {
            var files = e.target.files;
            samefunc(files);
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

        window.addEventListener('paste', (e) => {
            imagepaste(e)
        });
    }, [])

    const imagelink = [
        { "themb": "https://img.freepik.com/free-psd/3d-rendering-ui-icon_23-2149182289.jpg?size=626&ext=jpg&ga=GA1.1.705918186.1680088912&semt=sph" },
        { "themb": "https://img.freepik.com/free-photo/blue-butterfly-with-orange-yellow-wings-is-shown_1340-42909.jpg?size=626&ext=jpg&ga=GA1.1.705918186.1680088912&semt=sph" },
        { "themb": "https://img.freepik.com/free-photo/boy-with-colorful-haircut-that-has-word-it_1340-41697.jpg?size=626&ext=jpg&ga=GA1.1.705918186.1680088912&semt=sph" },
        { "themb": "https://img.freepik.com/premium-photo/retro-camera-winter-forest-filtered-image-processed-vintage-effect_856795-8453.jpg?size=626&ext=jpg&ga=GA1.1.705918186.1680088912&semt=sph" }
    ]


    const selectimg = (e) => {
        setImagedata(e.target.currentSrc)
    }

    // send and get data parent to child & child to parent
    // const ms = (imagedata)=>{
    //     setImagedata(imagedata)
    // }

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
                {/* <Demo m={ms}/> */}
                <div className='img-grid'>
                    {
                        imagelink.map((item, i) => {
                            return (
                                <img key={i} className='img-box' src={item.themb} alt={i} onClick={selectimg} />
                            )
                        })
                    }
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