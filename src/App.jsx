import { useState, useRef } from 'react'
import * as htmlToImage from "html-to-image";
import './App.css'
import data from './data';

function App() {

  // useState's to handle fields input
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [socialHandle, setSocialHandle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [job, setJob] = useState('');

  // ref to signature container for screenshot
  const refs = useRef([]);

  // take screen of signature using html-to-image package
  const takeScreenShot = async (node) => {
    const dataURI = await htmlToImage.toPng(node);
    return dataURI;
  };

  // create link for download taken screenshot
  const download = (image) => {
    const fileName = name ? `${name}-signature.png` : "";
  
    const a = document.createElement("a");
    a.href = image;
    a.download = fileName;
    a.click();
  };

  // change button display before and after taking screenshot
  const downloadScreenshot = (index) => {
    const ref = refs.current[index];
    const saveButton = ref.querySelector('.save-btn');
    saveButton.style.display = 'none';
    takeScreenShot(ref).then(image => {
      saveButton.style.display = 'block';
      download(image);
    });
  };

  return (
    <>
      <main>
        <h1 className='title'>Email Signature Generator</h1>

        <div className='photo-container'>
          {photo 
            ? 
            <>
              <img className='photo' src={photo && URL.createObjectURL(photo)} alt='User photo' />
              <button onClick={() => setPhoto(null)}>Remove photo</button>
            </> 
            :
            <label htmlFor='fileInput'>Click to select photo</label>
          }  
        </div>

        <input 
          type="file" 
          id='fileInput'
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        <form>
          <label>What's your name?</label>
          <input 
            placeholder='Vasyl Dudla' 
            type='text'
            onChange={(e) => setName(e.target.value)} 
          />

          <label>Your social media handle?</label>
          <input 
            placeholder='@vdudla' 
            type='text'
            onChange={(e) => setSocialHandle(e.target.value)} 
          />

          <label>Your job title?</label>
          <input 
            placeholder='Front-end developer' 
            type='text'
            onChange={(e) => setJob(e.target.value)} 
          />

          <label>The company you work for?</label>
          <input 
            placeholder='Self Inc.' 
            type='text'
            onChange={(e) => setCompany(e.target.value)} 
          />

          <label>Your phone number?</label>
          <input 
            placeholder='099-555-33-22' 
            type='text'
            onChange={(e) => setPhone(e.target.value)} 
          />

          <label>Your email address?</label>
          <input 
            placeholder='dudlavasil@gmail.com' 
            type='text'
            onChange={(e) => setEmail(e.target.value)} 
          />
          
        </form>
        <div className='signature-container'>
        {data.map((item, index) => (
          <div 
            className='signature' 
            ref={el => (refs.current[index] = el)} 
            key={index} 
            style={{ backgroundImage: `url(${item.backgroundUrl})`, color: item.color}}
          >
            <p><span className='name-title'>{name}</span> <span className='opacity-50'>{socialHandle}</span></p>
            <p>{job} {company && <span className='opacity-50'>at</span>} {company}</p>
            <p><span className='phone'>{phone}</span>{email}</p>
            {photo && <img className='photo-sign' src={photo && URL.createObjectURL(photo)} alt='User photo on signature' />}
            <button className='save-btn' onClick={() => downloadScreenshot(index)}>Save as PNG</button>
          </div>
        ))}
        </div>
      </main>
    </>
  )
}

export default App
