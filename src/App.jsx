import { useEffect, useState } from 'react'
import './App.css'



function App() {

  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(0);

  

  function handleForm(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let formObj = Object.fromEntries(formData.entries());
    let generateId = () => {
      setId(id + 1);
      return id;
    }

    if (!(formObj.id)) {
      formObj.id = generateId();
    }

    e.target.reset();
    setData([...data, formObj]);
  }

  function updateRecord(record) {
    let foundRecord = data.find(x => x.id === record.id);
    Object.assign(foundRecord, record);
    setData([...data]);
   
  }

  function deleteRecord(id) {
    if (!confirm('Emin misiniz?')) { return; }

    setData(data.filter(x => x.id !== id));
    
  }

  return (
    <div className='container'>
      <YeniKayit isOpen={isOpen} setIsOpen={setIsOpen} handleForm={handleForm} />

      <h1>Öğrenci Bilgi Sistemi <button onClick={() => setIsOpen(true)}>Yeni Kayıt</button></h1>
      <div className="studentTable">
        <ul className="studentTableTitles">
          <li>Ad</li>
          <li>Soyad</li>
          <li>E-Posta Adresi</li>
          <li>Doğum Tarihi</li>
          <li>#</li>
        </ul>
        {data.map(x => <StudentRow key={x.id} {...x} deleteRecord={deleteRecord} updateRecord={updateRecord} />)}
      </div>
    </div>
  )
}


function YeniKayit({ isOpen, setIsOpen, handleForm }) {
  return (
    <div className="kayit-container">
      <dialog open={isOpen} >
        <form className='form-text' onSubmit={handleForm} >
          <input required type="text" name='ad' placeholder='Adınızı Giriniz' />
          <input required type="text" name='soyad' placeholder='Soyadınızı Giriniz' />
          <input required type="date" name='dogumTarihi' />
          <input required type='email' name='ePosta' placeholder='E-postanızı Giriniz' />
          <div className="dialog-butons">
            <button type='button' onClick={() => setIsOpen(false)} >Vazgeç</button>
            <button className='saveBtns' type='submit' onClick={() => setIsOpen(false)}>Kaydet</button>
          </div>

        </form>

      </dialog>
    </div>
  )
}

function StudentRow({ id, ad, soyad, ePosta, dogumTarihi, updateRecord, deleteRecord }) {
  const [isEditing, setEditing] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    formObj.id = id;
    updateRecord(formObj);
    setEditing(false);
  }

  return (
    <form onSubmit={handleSubmit} onDoubleClick={() => setEditing(true)}>
      {isEditing ?
        <>
          <div className="studentTableCol">
            <input type="text" required name='ad' defaultValue={ad} />
          </div>
          <div className="studentTableCol">
            <input type="text" required name='soyad' defaultValue={soyad} />
          </div>
          <div className="studentTableCol">
            <input type="email" required name='ePosta' defaultValue={ePosta} />
          </div>
          <div className="studentTableCol">
            <input type="date" required name='dogumTarihi' defaultValue={dogumTarihi} />
          </div>
          <div className="studentTableCol">
            <button type='button' onClick={() => setEditing(false)}>vazgeç</button>
            <button className='saveBtn' type='submit'>kaydet</button>
          </div>
        </>
        :
        <>
          <div className="studentTableCol">{ad}</div>
          <div className="studentTableCol">{soyad}</div>
          <div className="studentTableCol">{ePosta}</div>
          <div className="studentTableCol">{dogumTarihi.split('-').reverse().join('.')}</div>
          <div className="studentTableCol">
            <button type='button' onClick={() => setEditing(true)}>düzenle</button>
            <button className='delBtn' type='button' onClick={() => deleteRecord(id)}>sil</button>
          </div>
        </>
      }
    </form>
  )
}

export default App
