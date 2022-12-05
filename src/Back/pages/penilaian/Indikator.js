import React, { useState, useEffect } from 'react'
import { link } from '../../../Axios/link'
import { useForm } from 'react-hook-form'
import { Link, useLocation } from 'react-router-dom'
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const Indikator = () => {
    const [pesan, setPesan] = useState('')
    const [id, setIdIndikator] = useState('')
    const [pilihan, setPilihan] = useState(true)
    const [refresh, setRefresh] = useState(Math.random)
    const { register, handleSubmit, reset, setValue } = useForm()
    const [data, setData] = useState([])

    const columns = [
        {
            name: "Kode Indikator",
            selector: "nomor_indikator",
            sortable: true
        },
        {
            name: "Indikator",
            selector: "indikator",
            sortable: true
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

    const location = useLocation()

    useEffect(() => {
        getIndikator() // eslint-disable-next-line
    }, [refresh])

    async function getIndikator() {
        const res = await link.get('Indikator/' + location.state?.idbidangpengembangan)
        const dataSementara = res.data.map((val) => ({
            nomor_indikator: val.nomor_indikator,
            indikator: val.indikator,
            ubah: val,
            hapus: val.id
        }))
        setData(dataSementara)
    }

    async function simpan(data) {
        if (pilihan) {
            let tambah = {
                bidang_pengembangan: location.state?.idbidangpengembangan,
                nomor_indikator: data.nomor_indikator,
                indikator: data.indikator
            }

            const res = await link.post('Indikator', tambah)
            setPesan(res.data.status)
        } else {
            let ubah = {
                bidang_pengembangan: location.state?.idbidangpengembangan,
                nomor_indikator: data.nomor_indikator,
                indikator: data.indikator,
                id: id
            }
            const res = await link.put('Indikator', ubah)
            setPesan(res.data.status)
            setPilihan(true)
        }

        reset()
        setRefresh(Math.random)
    }

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('Indikator/' + id)
            setPesan(res.data.message)
            setRefresh(Math.random)
        }
    }

    async function showData(data) {
        setValue('nomor_indikator', data.nomor_indikator)
        setValue('indikator', data.indikator)
        setIdIndikator(data.id)
        setPilihan(false)
    }

    return (
        <div className='p-3'>
            <div className="row">
                <h2>Data Indikator Bidang Pengembangan</h2>
            </div>
            <div className="row">
                <p>{pesan}</p>
                <p>Bidang Pengembangan: {location.state?.bidangpengembangan}</p>
                <p>Tahun Pelajaran: {location.state?.tapel}</p>
                <p>
                    <Link className="btn btn-success" to={{
                        pathname: "/admin/bidangpengembangan",
                        state: {
                            idTapel: location.state?.idTapel,
                            tapel: location.state?.tapel
                        }
                    }} replace><i className="fa fa-arrow-left" /> Kembali</Link>
                </p>
            </div>
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleSubmit(simpan)}>
                        <div className="mb-3">
                            <label htmlFor="nomor_indikator" className="form-label">Kode Indikator</label>
                            <input type="text" className="form-control" id="nomor_indikator" {...register("nomor_indikator", { required: true })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="indikator" className="form-label">Indikator</label>
                            <input type="text" className="form-control" id="indikator" {...register("indikator", { required: true })} />
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

export default Indikator
