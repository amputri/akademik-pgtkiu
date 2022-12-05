import React, { useState, useEffect } from 'react'
import { link, linkYPS, jenjang } from '../../../Axios/link'
import Select from 'react-select'
import { Link, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Capaian = () => {
    const location = useLocation()

    const [tapel, setTapel] = useState([])
    const [idTapel, setIdTapel] = useState()
    const [tingkat, setTingkat] = useState(location.state?.tingkat ? location.state?.tingkat : "0")
    const [isi, setIsi] = useState([])
    const [id, setIdCapaian] = useState('')
    const [idParent, setIdParent] = useState('')
    const [pesan, setPesan] = useState('')
    const [pilihan, setPilihan] = useState(true)
    const [refresh, setRefresh] = useState(Math.random)
    const { register, handleSubmit, reset, setValue } = useForm()
    
    useEffect(() => {
        getTapel() // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getCapaian() // eslint-disable-next-line
    }, [idTapel, tingkat, refresh])

    async function getTapel() {
        const res = await linkYPS.get('Tapel')
        setTapel(res.data)
        // eslint-disable-next-line
        res.data.map((value, index) => {
            const date = new Date()
            const month = date.getMonth()
            const year = date.getFullYear().toString()
            if ((month >= 0 && month <= 5 && value.tapel?.split('/')[1] === year) || (month >= 6 && month <= 11 && value.tapel?.split('/')[0] === year)) {
                setIdTapel(location.state?.idTapel ? location.state?.idTapel : value.idtapel)
            }
        })
    }

    async function getCapaian() {
        const res = await link.get(`Capaian/${idTapel}/${tingkat}`)
        setIsi(res.data)
    }

    async function simpan(data) {
        if (pilihan) {
            let tambah = {
                id_tapel: idTapel,
                tingkat: tingkat,
                nomor_capaian: data.nomor_capaian,
                capaian: data.capaian,
                id_parent: data.id_parent,
            }

            const res = await link.post('Capaian', tambah)
            setPesan(res.data.status)
        } else {
            let ubah = {
                nomor_capaian: data.nomor_capaian,
                capaian: data.capaian,
                id_parent: data.id_parent,
                id: id
            }
            const res = await link.put('Capaian', ubah)
            setPesan(res.data.status)
            setPilihan(true)
        }

        reset()
        setRefresh(Math.random)
    }

    function setTapelSelect(e) {
        setIdTapel(e.value)
    }

    function setJenjangSelect(e) {
        setTingkat(e.value)
    }

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('Capaian/' + id)
            setPesan(res.data.message)
            setRefresh(Math.random)
        }
    }

    async function showData(data) {
        setValue('nomor_capaian', data.nomor_capaian)
        setValue('capaian', data.capaian)
        setIdParent(data.id_parent)
        setIdCapaian(data.id)
        setPilihan(false)
    }

    return (
        <div className='p-3'>
            <div className="row">
                <h2>Data Item Pencapaian</h2>
            </div>
            <div className="row">
                <p>{pesan}</p>
            </div>
            <div className='row'>
                <span>Pilih Tahun Pelajaran</span>
                <Select
                    onChange={setTapelSelect.bind(this)}
                    options={
                        tapel.map(tapel => ({
                            value: tapel.idtapel, label: tapel.tapel
                        }))
                    }
                    placeholder={location.state?.tapel ? location.state?.tapel : tapel[tapel.map(item => item.idtapel).indexOf(idTapel)]?.tapel}
                />
                <span className='mt-2'>Pilih Jenjang</span>
                <Select
                    onChange={setJenjangSelect.bind(this)}
                    options={jenjang}
                    placeholder={location.state?.namaTingkat ? location.state?.namaTingkat : jenjang[jenjang.map(item => item.value).indexOf(tingkat)]?.label}
                />
                <form onSubmit={handleSubmit(simpan)}>
                    <div className="my-3">
                        <label htmlFor="nomor_capaian" className="form-label">Nomor Urut Capaian di Raport</label>
                        <input type="text" className="form-control" id="nomor_capaian" {...register("nomor_capaian", { required: true })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="capaian" className="form-label">Capaian</label>
                        <input type="text" className="form-control" id="capaian" {...register("capaian", { required: true })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="id_parent" className="form-label">Pilih Sup Capaian</label>
                        <select name="id_parent" className="form-control" {...register("id_parent", { required: true })}>
                            {idParent === 0 ? <option value="0" selected>-</option> : <option value="0">-</option>}
                            {
                                isi.map((val, index) => (
                                    <React.Fragment key={'c' + index}>
                                        {idParent === val.id ? <option key={index} value={val.id} selected>{val.nomor_capaian}. {val.capaian}</option> : <option key={index} value={val.id}>{val.nomor_capaian}. {val.capaian}</option>}
                                        {
                                            val.sub.map((val2, index2) => (
                                                <React.Fragment key={'cc' + index2}>
                                                    {idParent === val2.id ? <option key={'2' + index2} value={val2.id} selected>{'>>'} {val2.nomor_capaian}. {val2.capaian}</option> : <option key={'2' + index2} value={val2.id}>{'>>'} {val2.nomor_capaian}. {val2.capaian}</option>}
                                                    {
                                                        val2.sub.map((val3, index3) => (
                                                            <React.Fragment key={'ccc' + index3}>
                                                                {idParent === val3.id ? <option key={'3' + index3} value={val3.id} selected>{'>>>>'} {val3.nomor_capaian}. {val3.capaian}</option> : <option key={'3' + index3} value={val3.id}>{'>>>>'} {val3.nomor_capaian}. {val3.capaian}</option>}
                                                            </React.Fragment>
                                                        ))
                                                    }
                                                </React.Fragment>
                                            ))
                                        }
                                    </React.Fragment>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <input type="submit" className="btn btn-primary" value="Simpan" />
                    </div>
                </form>
            </div> 
            <hr />
            <div className="row">
                {
                    isi.map((val, index) => (
                        <div key={'c' + index}>
                            <div key={index}>
                                <span>{val.nomor_capaian}. {val.capaian}</span>
                                <Link style={{ backgroundColor: '#2196f3' }}  className='text-white p-2 rounded text-decoration-none mx-2' to={{
                                    pathname: "/admin/subcapaian",
                                    state: {
                                        id_capaian: val.id,
                                        capaian: val.nomor_capaian + '. ' + val.capaian,
                                        tapel: tapel[tapel.map(item => item.idtapel).indexOf(idTapel)]?.tapel,
                                        tingkat: jenjang[jenjang.map(item => item.value).indexOf(tingkat)]?.label
                                    }
                                }} replace><i className="fa fa-edit" /> Subcapaian</Link>
                                <span onClick={() => showData(val)} className="text-white p-2 mx-2 rounded" style={{ cursor: 'pointer', backgroundColor: '#2196f3' }}><i className="fa fa-edit" /> Ubah</span>
                                <span onClick={() => hapus(val.id)} className="text-white p-2 mx-2 rounded" style={{ cursor: 'pointer', backgroundColor: '#e91e63' }}><i className="fa fa-trash" /> Hapus</span>
                                <hr />
                            </div>
                            {
                                val.sub.map((val2, index2) => (
                                    <div key={'d' + index2}>
                                        <div key={'2' + index2}>
                                            <span className='ps-4'>{val2.nomor_capaian}. {val2.capaian}</span>
                                            <Link style={{ backgroundColor: '#2196f3' }}  className='text-white p-2 rounded text-decoration-none mx-2' to={{
                                                pathname: "/admin/subcapaian",
                                                state: {
                                                    id_capaian: val2.id,
                                                    capaian: val2.nomor_capaian + '. ' + val2.capaian,
                                                    tapel: tapel[tapel.map(item => item.idtapel).indexOf(idTapel)]?.tapel,
                                                    tingkat: jenjang[jenjang.map(item => item.value).indexOf(tingkat)]?.label,
                                                    idTingkat: tingkat,
                                                    idTapel: idTapel
                                                }
                                            }} replace><i className="fa fa-edit" /> Subcapaian</Link>
                                            <span onClick={() => showData(val2)} className="text-white p-2 mx-2 rounded" style={{ cursor: 'pointer', backgroundColor: '#2196f3' }}><i className="fa fa-edit" /> Ubah</span>
                                            <span onClick={() => hapus(val2.id)} className="text-white p-2 mx-2 rounded" style={{ cursor: 'pointer', backgroundColor: '#e91e63' }}><i className="fa fa-trash" /> Hapus</span>
                                            <hr />
                                        </div>
                                        {
                                            val2.sub.map((val3, index3) => (
                                                <div key={'3' + index3}>
                                                    <span className='ps-5'>{val3.nomor_capaian}. {val3.capaian}</span>
                                                    <Link style={{ backgroundColor: '#2196f3' }}  className='text-white p-2 rounded text-decoration-none mx-2' to={{
                                                        pathname: "/admin/subcapaian",
                                                        state: {
                                                            id_capaian: val3.id,
                                                            capaian: val3.nomor_capaian + '. ' + val3.capaian,
                                                            tapel: tapel[tapel.map(item => item.idtapel).indexOf(idTapel)]?.tapel,
                                                            tingkat: jenjang[jenjang.map(item => item.value).indexOf(tingkat)]?.label
                                                        }
                                                    }} replace><i className="fa fa-edit" /> Subcapaian</Link>
                                                    <span onClick={() => showData(val3)} className="text-white p-2 mx-2 rounded" style={{ cursor: 'pointer', backgroundColor: '#2196f3' }}><i className="fa fa-edit" /> Ubah</span>
                                                    <span onClick={() => hapus(val3.id)} className="text-white p-2 mx-2 rounded" style={{ cursor: 'pointer', backgroundColor: '#e91e63' }}><i className="fa fa-trash" /> Hapus</span>
                                                    <hr />
                                                </div>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Capaian
