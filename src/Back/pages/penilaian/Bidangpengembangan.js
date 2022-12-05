import React, { useState, useEffect } from 'react'
import { link, linkYPS } from '../../../Axios/link'
import { useForm } from 'react-hook-form'
import { Link, useLocation } from 'react-router-dom'
import Select from 'react-select'
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const Bidangpengembangan = () => {
    const location = useLocation()

    const [tapel, setTapel] = useState([])
    const [idTapel, setIdTapel] = useState()
    const [isi, setIsi] = useState([])
    const [pesan, setPesan] = useState('')
    const [id, setIdBidangPengembangan] = useState('')
    const [pilihan, setPilihan] = useState(true)
    const [data, setData] = useState([])

    const columns = [
        {
            name: "Nomor Urut",
            selector: "nomor_urut",
            sortable: true
        },
        {
            name: "Bidang Pengembangan",
            selector: "bidang_pengembangan",
            sortable: true
        },
        {
            name: "Indikator",
            selector: "indikator",
            sortable: false,
            cell: c => (<Link className='text-white p-2 rounded text-decoration-none' style={{ backgroundColor: '#2196f3', cursor: 'pointer' }} to={{
                pathname: "/admin/indikator",
                state: {
                    idbidangpengembangan: c.indikator.idbidangpengembangan,
                    bidangpengembangan: c.indikator.bidangpengembangan,
                    tapel: c.indikator.tapel,
                    idTapel: c.indikator.idTapel
                }
            }} replace><i className="fa fa-edit" /> Indikator</Link>)
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

    const [refresh, setRefresh] = useState(Math.random)

    const { register, handleSubmit, reset, setValue } = useForm()

    useEffect(() => {
        getTapel() // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getBidangPengembangan() // eslint-disable-next-line
    }, [idTapel, refresh])

    useEffect(() => {
        setIsiTabel() // eslint-disable-next-line
    }, [isi, tapel, idTapel])

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

    async function getBidangPengembangan() {
        const res = await link.get('Bidangpengembangan/' + idTapel)
        setIsi(res.data)
    }

    function setIsiTabel() {
        const dataSementara = isi.map((val, index) => ({
            nomor_urut: val.nomor_urut,
            bidang_pengembangan: val.bidang_pengembangan,
            indikator: {
                idbidangpengembangan: val.id,
                bidangpengembangan: val.nomor_urut + '. ' + val.bidang_pengembangan,
                tapel: tapel[tapel.map(item => item.idtapel).indexOf(idTapel)]?.tapel,
                idTapel: idTapel
            },
            ubah: val,
            hapus: val.id
        }))
        setData(dataSementara)
    }

    async function simpan(data) {
        if (pilihan) {
            let tambah = {
                id_tapel: idTapel,
                nomor_urut: data.nomor_urut,
                bidang_pengembangan: data.bidang_pengembangan
            }

            const res = await link.post('Bidangpengembangan', tambah)
            setPesan(res.data.status)
        } else {
            let ubah = {
                id_tapel: idTapel,
                nomor_urut: data.nomor_urut,
                bidang_pengembangan: data.bidang_pengembangan,
                id: id
            }
            const res = await link.put('Bidangpengembangan', ubah)
            setPesan(res.data.status)
            setPilihan(true)
        }

        reset()
        setRefresh(Math.random)
    }

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('Bidangpengembangan/' + id)
            setPesan(res.data.message)
            setRefresh(Math.random)
        }
    }

    async function showData(data) {
        setValue('bidang_pengembangan', data.bidang_pengembangan)
        setValue('nomor_urut', data.nomor_urut)
        setIdBidangPengembangan(data.id)
        setPilihan(false)
    }

    function setTapelSelect(e) {
        setIdTapel(e.value)
        setPilihan(true)
    }

    return (
        <div className='p-3'>
            <div className="row">
                <h2>Data Bidang Pengembangan</h2>
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
                            <label htmlFor="nomor_urut" className="form-label">Nomor Urut Bidang Pengembangan di Raport</label>
                            <input type="number" className="form-control" id="nomor_urut" {...register("nomor_urut", { required: true })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bidang_pengembangan" className="form-label">Bidang Pengembangan</label>
                            <input type="text" className="form-control" id="bidang_pengembangan" {...register("bidang_pengembangan", { required: true })} />
                        </div>
                        <div className="mb-3">
                            <input type="submit" className="btn btn-primary" value="Simpan" />
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

export default Bidangpengembangan
