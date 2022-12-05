import React, { useState, useEffect } from 'react'
import { link, jenjang } from '../../Axios/link'
import { useForm } from 'react-hook-form'
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const Kelas = () => {
    const [pesan, setPesan] = useState('')
    const [id, setIdKelas] = useState('')
    const [tingkat, setTingkat] = useState([])
    const [pilihan, setPilihan] = useState(true)
    const [data, setData] = useState([])

    const columns = [
        {
            name: "No",
            selector: "no",
            sortable: true
        },
        {
            name: "Tingkat",
            selector: "tingkat",
            sortable: true
        },
        {
            name: "Nama",
            selector: "nama",
            sortable: true
        },
        {
            name: "Ubah",
            selector: "ubah",
            sortable: false,
            cell: d => <span onClick={() => showData(d.ubah)}  className='text-white p-2 rounded' style={{ backgroundColor: '#2196f3', cursor: 'pointer' }}><i className="fa fa-edit" /> Ubah</span>
        },
        {
            name: "Hapus",
            selector: "hapus",
            sortable: false,
            cell: e => <span onClick={() => hapus(e.hapus)} className='text-white p-2 rounded' style={{ backgroundColor: '#e91e63', cursor: 'pointer' }}><i className="fa fa-trash" /> Hapus</span>
        },
        ]

    const [refresh, setRefresh] = useState(Math.random)

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm()


    useEffect(() => {
        getKelas() // eslint-disable-next-line 
    }, [refresh])

    async function getKelas() {
        const res = await link.get('Kelas')
        let nomor = 1
        const dataSementara = res.data.map((val) => ({
            no: nomor++,
            tingkat: jenjang[jenjang.map(item => item.value).indexOf(val.tingkat)].label,
            nama: val.nama_kelas,
            ubah: val,
            hapus: val.id
        }))
        setData(dataSementara)
    }

    async function simpan(data) {
        if (pilihan) {
            let tambah = {
                nama_kelas: data.nama_kelas,
                tingkat: data.tingkat,

            }

            const res = await link.post('Kelas', tambah)
            setPesan(res.data.status)
        } else {
            let ubah = {
                nama_kelas: data.nama_kelas,
                tingkat: data.tingkat,
                id: id
            }
            const res = await link.put('Kelas', ubah)
            setPesan(res.data.status)
            setPilihan(true)
        }

        reset()
        setRefresh(Math.random)
    }

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('Kelas/' + id)
            setPesan(res.data.message)
            setRefresh(Math.random)
        }
    }

    async function showData(data) {
        setValue('nama_kelas', data.nama_kelas)
        setTingkat(data.tingkat)
        setIdKelas(data.id)
        setPilihan(false)
    }

    // batasan untuk edit
    return (
        <div className='p-3'>
            <div className="row">
                <h2>Data Kelas </h2>
            </div>
            <div className="row">
                <p>{pesan}</p>
            </div>
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleSubmit(simpan)}>
                        <div className="col-12 pb-3">
                            <label htmlFor="tingkat" className="form-label">Tingkat</label>
                            <select name="tingkat" className="form-control" {...register("tingkat", { required: true })}>
                                {
                                    jenjang.map((val, index) =>
                                        val.value === tingkat ? (
                                            <option key={index} selected value={val.value}>
                                                {val.label}
                                            </option>
                                        ) : (
                                            <option key={index} value={val.value}>
                                                {val.label}
                                            </option>
                                        )
                                    )
                                }
                            </select>
                        </div>
                        <div className="col-12 pb-3">
                            <label htmlFor="nama_kelas" className="form-label">Nama Kelas</label>
                            <input type="text" className="form-control" id="nama_kelas" {...register("nama_kelas", { required: true })} />
                            {errors.nama_kelas && <span>This field is required</span>}
                        </div>
                        <div className="col-4 pb-3">
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

export default Kelas
