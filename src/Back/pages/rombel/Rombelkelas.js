import React, { useState, useEffect } from 'react'
import { link, linkYPS } from '../../../Axios/link'
import { useForm } from 'react-hook-form'
import { Link, useLocation } from 'react-router-dom'
import Select from 'react-select'
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const Rombelkelas = () => {
    const location = useLocation()

    const [tapel, setTapel] = useState([])
    const [idTapel, setIdTapel] = useState()
    const [kelas, setKelas] = useState([])
    const [guru, setGuru] = useState([])
    const [rombel, setRombel] = useState([])
    const [selectedIndex, setSelectedIndex] = useState([])
    const [pesan, setPesan] = useState('')
    const [pilihan, setPilihan] = useState(true)
    const [refresh, setRefresh] = useState(Math.random)
    const [data, setData] = useState([])

    const columns = [
        {
            name: "No",
            selector: "no",
            sortable: true
        },
        {
            name: "Kelas",
            selector: "kelas",
            sortable: true
        },
        {
            name: "Wali Kelas",
            selector: "walas",
            sortable: true
        },
        {
            name: "Pendamping",
            selector: "pendamping",
            sortable: true
        },
        {
            name: "Siswa",
            selector: "siswa",
            sortable: false,
            cell: c => (<Link className='text-white p-2 rounded text-decoration-none' style={{ backgroundColor: '#2196f3', cursor: 'pointer' }} to={{
                pathname: "/admin/rombelsiswa",
                state: {
                    idrombel: c.siswa.idrombel,
                    tapel: c.siswa.tapel,
                    idtapel: c.siswa.idtapel,
                    kelas: c.siswa.kelas,
                    tingkat: c.siswa.tingkat,
                    walas: c.siswa.walas,
                    pendamping: c.siswa.pendamping
                }
            }} replace><i className="fa fa-users" /> Siswa</Link>)
        },
        {
            name: "Ubah",
            selector: "ubah",
            sortable: false,
            cell: d => <span onClick={() => showData(d.ubah)} className='text-white p-2 rounded' style={{ backgroundColor: '#2196f3', cursor: 'pointer' }}><i className="fa fa-edit" /> Ubah</span>
        },
        {
            name: "Hapus",
            selector: "hapus",
            sortable: false,
            cell: e => <span onClick={() => hapus(e.hapus)} className='text-white p-2 rounded' style={{ backgroundColor: '#e91e63', cursor: 'pointer' }}><i className="fa fa-trash" /> Hapus</span>
        },
    ]

    const { register, handleSubmit } = useForm()

    useEffect(() => {
        getTapel()
        getGuru()
        getKelas() // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setIsiTabel() // eslint-disable-next-line
    }, [rombel, tapel, guru, kelas])

    useEffect(() => {
        getRombel() // eslint-disable-next-line
    }, [idTapel, refresh])

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

    async function getKelas() {
        const res = await link.get('Kelas')
        setKelas(res.data)
    }

    async function getGuru() {
        const res = await linkYPS.get(`Guru/guruPGTKIU`)
        setGuru(res.data)
    }

    async function getRombel() {
        const res = await link.get(`Rombel/${idTapel}`)
        setRombel(res.data)
    }

    function setIsiTabel() {
        let nomor = 1
        const dataSementara = rombel.map((val, index) => ({
            no: nomor++,
            kelas: kelas[kelas.map(item => item.id).indexOf(val.id_kelas)]?.nama_kelas,
            walas: guru[guru.map(item => item.idguru).indexOf(val.walas)]?.nama,
            pendamping: guru[guru.map(item => item.idguru).indexOf(val.pendamping)]?.nama,
            siswa: {
                idrombel: val.id,
                tapel: tapel[tapel.map(item => item.idtapel).indexOf(idTapel)]?.tapel,
                idtapel: tapel[tapel.map(item => item.idtapel).indexOf(idTapel)]?.idtapel,
                kelas: kelas[kelas.map(item => item.id).indexOf(val.id_kelas)]?.nama_kelas,
                tingkat: kelas[kelas.map(item => item.id).indexOf(val.id_kelas)]?.tingkat,
                walas: guru[guru.map(item => item.idguru).indexOf(val.walas)]?.nama,
                pendamping: guru[guru.map(item => item.idguru).indexOf(val.pendamping)]?.nama
            },
            ubah: index,
            hapus: val.id
        }))
        setData(dataSementara)
    }

    async function simpan(data) {
        if (pilihan) {
            let tambah = {
                id_tapel: idTapel,
                id_kelas: data.id_kelas,
                walas: data.walas,
                pendamping: data.pendamping
            }

            const res = await link.post('Rombel', tambah)
            setPesan(res.data.status)
        } else {
            let ubah = {
                id: rombel[selectedIndex].id,
                id_tapel: idTapel,
                id_kelas: data.id_kelas,
                walas: data.walas,
                pendamping: data.pendamping
            }

            const res = await link.put('Rombel', ubah)
            setPesan(res.data.status)
            setPilihan(true)
        }

        setRefresh(Math.random)
    }

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('Rombel/' + id)
            setPesan(res.data.status)
            setRefresh(Math.random)
        }
    }

    function showData(index) {
        setSelectedIndex(index)
        setPilihan(false)
    }

    function setTapelSelect(e) {
        setIdTapel(e.value)
    }

    // batasan untuk edit
    return (
        <div className='p-3'>
            <div className="row">
                <h2>Data Kelas per-Tahun</h2>
            </div>
            <div className="row">
                <p>{pesan}</p>
            </div>
            <div className='row mb-2'>
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
            </div>
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleSubmit(simpan)}>
                        <div className="mb-3">
                            <label htmlFor="id_kelas" className="form-label">Pilih Nama Kelas</label>
                            <select name="id_kelas" className="form-control" {...register("id_kelas", { required: true })}>
                                {
                                    kelas.map((val, index) =>
                                        val.id === rombel[selectedIndex]?.id_kelas ? (
                                            <option key={index} value={val.id} selected>
                                                {val.nama_kelas}
                                            </option>
                                        ) : (
                                            <option key={index} value={val.id}>
                                                {val.nama_kelas}
                                            </option>
                                        )
                                    )
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="walas" className="form-label">Pilih Wali Kelas</label>
                            <select name="walas" className="form-control" {...register("walas", { required: true })}>
                                {
                                    guru.map((val, index) =>
                                        val.idguru === rombel[selectedIndex]?.walas ? (
                                            <option key={index} value={val.idguru} selected>
                                                {val.nama}
                                            </option>
                                        ) : (
                                            <option key={index} value={val.idguru}>
                                                {val.nama}
                                            </option>
                                        )
                                    )
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pendamping" className="form-label">Pilih Pendamping</label>
                            <select name="pendamping" className="form-control" {...register("pendamping", { required: true })}>
                                {
                                    guru.map((val, index) =>
                                        val.idguru === rombel[selectedIndex]?.pendamping ? (
                                            <option key={index} value={val.idguru} selected>
                                                {val.nama}
                                            </option>
                                        ) : (
                                            <option key={index} value={val.idguru}>
                                                {val.nama}
                                            </option>
                                        )
                                    )
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <input type="submit" className="btn btn-primary" value='Simpan' />
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <DataTableExtensions {...{ columns, data }}>
                    <DataTable
                        columns={columns}
                        data={data}
                        noHeader
                        defaultSortField="no"
                        pagination
                        highlightOnHover
                    />
                </DataTableExtensions>
            </div>
        </div>
    )
}

export default Rombelkelas
