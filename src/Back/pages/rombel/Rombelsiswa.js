import React, { useState, useEffect } from 'react'
import { link, linkYPS } from '../../../Axios/link'
import { Link, useLocation } from 'react-router-dom'
import Select from 'react-select'
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const Rombelsiswa = () => {
    const location = useLocation()

    const [pesan, setPesan] = useState('')
    const [refresh, setRefresh] = useState(Math.random)
    const [siswaRombel, setSiswaRombel] = useState([])
    const [isi, setIsi] = useState([])
    const [detailIsi, setDetailIsi] = useState([])
    const [idSiswa, setIdSiswa] = useState([])
    const [data, setData] = useState([])

    const columns = [
        {
            name: "No",
            selector: "no",
            sortable: true
        },
        {
            name: "Nama Siswa",
            selector: "nama_siswa",
            sortable: true
        },
        {
            name: "Hapus",
            selector: "hapus",
            sortable: false,
            cell: e => <span onClick={() => hapus(e.hapus)} className='text-white p-2 rounded' style={{ backgroundColor: '#e91e63', cursor: 'pointer' }}><i className="fa fa-trash" /> Hapus</span>
        },
    ]


    useEffect(() => {
        getSiswarombel()
        getSiswa() // eslint-disable-next-line
    }, [refresh])
    
    useEffect(() => {
        setIsiTabel() // eslint-disable-next-line
    }, [siswaRombel, detailIsi])

    async function getSiswarombel() {
        const res = await link.get(`Siswarombel/${location.state?.idrombel}`)
        setSiswaRombel(res.data)
    }

    async function getSiswa() {
        const res = await link.get(`Siswa/${location.state?.idtapel}/${location.state?.tingkat}`)
        setIsi(res.data)
        getSiswaWithDetail(res.data)
    }

    async function getDetailSiswa(idSiswa) {
        const res = await linkYPS.get(`Siswa/detail/${idSiswa}`)
        return res.data
    }

    async function getSiswaWithDetail(siswa) {
        const withDetail = await Promise.all(siswa.map(siswa => getDetailSiswa(siswa.id_siswa)))
        setDetailIsi(withDetail)
    }
    
    function setIsiTabel() {
        let nomor = 1
        const dataSementara = siswaRombel.map((val, index) => ({
            no: nomor++,
            nama_siswa: detailIsi[detailIsi.map(item => item.idsiswa).indexOf(val.ref_siswa)]?.nama_siswa,
            hapus: val.id
        }))
        setData(dataSementara)
    }

    function setSiswaSelect(e) {
        setIdSiswa(e.value)
    }

    async function simpan() {
        let tambah = {
            id_siswa: idSiswa,
            id_rombel: location.state?.idrombel
        }

        const res = await link.post('Siswarombel', tambah)
        setPesan(res.data.status)
        setRefresh(Math.random)
    }

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('Siswarombel/' + id)
            setPesan(res.data.status)
            setRefresh(Math.random)
        }
    }

    // batasan untuk edit
    return (
        <div className='p-3'>
            <div className="row">
                <h2>Data Siswa per-Kelas</h2>
            </div>
            <div className="row">
                <p>{pesan}</p>
                <p>Tahun Pelajaran: {location.state?.tapel}</p>
                <p>Kelas: {location.state?.kelas}</p>
                <p>Wali Kelas: {location.state?.walas}</p>
                <p>Pendamping: {location.state?.pendamping}</p>
                <p>
                    <Link className="btn btn-success" to={{
                        pathname: "/admin/rombelkelas",
                        state: {
                            idTapel: location.state?.idtapel,
                            tapel: location.state?.tapel
                        }
                    }} replace><i className="fa fa-arrow-left" /> Kembali</Link>
                </p>
            </div>
            <div className='row my-2'>
                <span className='mb-2'>Pilih Siswa Pendaftar</span>
                <Select
                    onChange={setSiswaSelect.bind(this)}
                    options={
                        isi.map((val, index) => ({
                            value: val.id,
                            label: detailIsi[index]?.nama_siswa
                        }))
                    }
                    placeholder="Pilih Siswa"
                />
                <button onClick={() => simpan()} className="btn btn-primary mt-3 col-2 ms-3">Tambah</button>
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

export default Rombelsiswa
