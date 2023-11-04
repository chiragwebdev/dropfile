import React from 'react'

function Demo(props) {
  
    const mm =props.m

    const selectimg =(e)=>{
        const sendlink = e.target.currentSrc;
        mm(sendlink)
    }

    return (
        <>
        {/* <button onClick={sendmm}>Click</button> */}
            <div className='img-grid'>
                <div className='img-box'>
                    <img src="https://img.freepik.com/free-psd/3d-rendering-ui-icon_23-2149182289.jpg?size=626&ext=jpg&ga=GA1.1.705918186.1680088912&semt=sph" alt="" onClick={selectimg} />
                </div>
                <div className='img-box'>
                    <img src="https://img.freepik.com/free-photo/blue-butterfly-with-orange-yellow-wings-is-shown_1340-42909.jpg?size=626&ext=jpg&ga=GA1.1.705918186.1680088912&semt=sph" alt="" />
                </div>
                <div className='img-box'>
                    <img src="https://img.freepik.com/free-photo/boy-with-colorful-haircut-that-has-word-it_1340-41697.jpg?size=626&ext=jpg&ga=GA1.1.705918186.1680088912&semt=sph" alt="" />
                </div>
                <div className='img-box'>
                    <img src="https://img.freepik.com/premium-photo/retro-camera-winter-forest-filtered-image-processed-vintage-effect_856795-8453.jpg?size=626&ext=jpg&ga=GA1.1.705918186.1680088912&semt=sph" alt="" />
                </div>
            </div>
        </>
    )
}

export default Demo