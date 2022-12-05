import React, { useState, useEffect } from 'react'
import { link } from '../../../Axios/link'
import { useForm } from 'react-hook-form'
import { Link, useLocation } from 'react-router-dom'
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const Subcapaian = () => {
    const [pesan, setPesan] = useState('')
    const [id, setIdSubcapaian] = useState('')
    const [pilihan, setPilihan] = useState(true)
    const [refresh, setRefresh] = useState(Math.random)
    const { register, handleSubmit, reset, setValue } = useForm()
    const [data, setData] = useState([])

    const columns = [
        {
            name: "Nomor Urut",
            selector: "nomor_urut",
            sortable: true
        },
        {
            name: "Sub Capaian",
            selector: "subcapaian",
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
        getSubcapaian() // eslint-disable-next-line
    }, [refresh])

    async function getSubcapaian() {
        const res = await link.get('Subcapaian/' + location.state?.id_capaian)
        const dataSementara = res.data.map((val) => ({
            nomor_urut: val.nomor_subcapaian,
            subcapaian: val.subcapaian,
            ubah: val,
            hapus: val.id
        }))
        setData(dataSementara)
    }

    async function simpan(data) {
        if (pilihan) {
            let tambah = {
                id_capaian: location.state?.id_capaian,
                nomor_subcapaian: data.nomor_subcapaian,
                subcapaian: data.subcapaian
            }

            const res = await link.post('Subcapaian', tambah)
            setPesan(res.data.status)
        } else {
            let ubah = {
                nomor_subcapaian: data.nomor_subcapaian,
                subcapaian: data.subcapaian,
                id: id
            }
            const res = await link.put('Subcapaian', ubah)
            setPesan(res.data.status)
            setPilihan(true)
        }

        reset()
        setRefresh(Math.random)
    }

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('Subcapaian/' + id)
            setPesan(res.data.message)
            setRefresh(Math.random)
        }
    }

    async function showData(data) {
        setValue('nomor_subcapaian', data.nomor_subcapaian)
        setValue('subcapaian', data.subcapaian)
        setIdSubcapaian(data.id)
        setPilihan(false)
    }

    return (
        <div className='p-3'>
            <div className="row">
                <h2>Data Item Sub Capaian</h2>
            </div>
            <div className="row">
                <p>{pesan}</p>
                <p>Sup Capaian: {location.state?.capaian}</p>
                <p>Tahun Pelajaran: {location.state?.tapel}</p>
                <p>Jenjang: {location.state?.tingkat}</p>
                <p>
                    <Link className="btn btn-success" to={{
                        pathname: "/admin/capaian",
                        state: {
                            idTapel: location.state?.idTapel,
                            tingkat: location.state?.idTingkat,
                            tapel: location.state?.tapel,
                            namaTingkat: location.state?.tingkat
                        }
                    }} replace><i className="fa fa-arrow-left" /> Kembali</Link>
                </p>
            </div>
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleSubmit(simpan)}>
                        <div className="mb-3">
                            <label htmlFor="nomor_subcapaian" className="form-label">Nomor Urut Sub Capaian di Rapot</label>
                            <input type="text" className="form-control" id="nomor_subcapaian" {...register("nomor_subcapaian", { required: true })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subcapaian" className="form-label">Sub Capaian</label>
                            <input type="text" className="form-control" id="subcapaian" {...register("subcapaian", { required: true })} />
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

export default Subcapaian
