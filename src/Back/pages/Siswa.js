import React, { useState, useEffect } from 'react'
import { link, linkYPS, jenjang, status, pendidikan, pekerjaan, penghasilan } from '../../Axios/link'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const Siswa = () => {
    const [tapel, setTapel] = useState([])
    const [idTapel, setIdTapel] = useState()
    const [tingkat, setTingkat] = useState("0")
    const [daftar, setDaftar] = useState([])
    const [idDaftar, setIdDaftar] = useState()
    const [idSiswa, setIdSiswa] = useState()
    const [isi, setIsi] = useState([])
    const [detailIsi, setDetailIsi] = useState([])
    const [selectedIndex, setSelectedIndex] = useState([])
    const [pesan, setPesan] = useState('')
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
            name: "Panggilan",
            selector: "panggilan",
            sortable: true
        },
        {
            name: "L/P",
            selector: "jenis_kelamin",
            sortable: true
        },
        {
            name: "Status",
            selector: "status",
            sortable: true
        },
        {
            name: "Tanggal Masuk",
            selector: "tanggal_masuk",
            sortable: true
        },
        {
            name: "Ubah",
            selector: "ubah",
            sortable: false,
            cell: d => <span onClick={() => showData(d.ubah)} data-bs-toggle="modal" data-bs-target="#exampleModal" className='text-white p-2 rounded' style={{ backgroundColor: '#2196f3', cursor: 'pointer' }}><i className="fa fa-edit" /> Ubah</span>
        },
        {
            name: "Hapus",
            selector: "hapus",
            sortable: false,
            cell: e => <span onClick={() => hapus(e.hapus.split(',')[0], e.hapus.split(',')[1])} className='text-white p-2 rounded' style={{ backgroundColor: '#e91e63', cursor: 'pointer' }}><i className="fa fa-trash" /> Hapus</span>
        },
        ]

    const [refresh, setRefresh] = useState(Math.random)

    const { register: register2, handleSubmit: handleSubmit2 } = useForm()
    const { register, handleSubmit, setValue } = useForm()

    useEffect(() => {
        getTapel()
    }, [])

    useEffect(() => {
        setIsiTabel() // eslint-disable-next-line
    }, [isi, detailIsi])


    useEffect(() => {
        getDaftar()
        getSiswa() // eslint-disable-next-line
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
                setIdTapel(value.idtapel)
            }
        })
    }

    async function getDaftar() {
        const res = await linkYPS.get(`Siswa/daftar/${idTapel}/${tingkat}`)
        setDaftar(res.data)
    }

    async function getSiswa() {
        const res = await link.get(`Siswa/${idTapel}/${tingkat}`)
        setIsi(res.data)
        getSiswaWithDetail(res.data)
    }

    function setIsiTabel(){
        let nomor = 1
        const dataSementara = isi.map((val,index) => ({
            no: nomor++,
            nama_siswa: detailIsi[index]?.nama_siswa,
            panggilan: detailIsi[index]?.panggilan,
            jenis_kelamin: detailIsi[index]?.jenis_kelamin,
            status: status[val.status - 1]?.label,
            tanggal_masuk: val.tanggal_masuk,
            ubah: index,
            hapus: `${val.id},${val.id_daftar}`
        }))
        setData(dataSementara)
    }

    async function getDetailSiswa(idSiswa) {
        const res = await linkYPS.get(`Siswa/detail/${idSiswa}`)
        return res.data
    }

    async function getSiswaWithDetail(siswa) {
        const withDetail = await Promise.all(siswa.map(siswa => getDetailSiswa(siswa.id_siswa)))
        setDetailIsi(withDetail)
    }

    async function simpan(data) {
        let tambah = {
            id_tapel: idTapel,
            jenjang: tingkat,
            id_daftar: idDaftar,
            id_siswa: idSiswa,
            tanggal_masuk: data.tanggal_masuk,
        }

        const res = await link.post('Siswa', tambah)
        const resDaftar = await linkYPS.put('Siswa/daftar/' + idDaftar, { status: 1 })
        setPesan(res.data.status + ' & ' + resDaftar.data.status)
        setRefresh(Math.random)
    }

    async function ubah(data) {
        let siswaYPS = {
            idsiswa: detailIsi[selectedIndex].idsiswa,
            nama_siswa: data.nama_siswa,
            jenis_kelamin: data.jenis_kelamin,
            panggilan: data.panggilan,
            nisn: data.nisn,
            tempat_lahir: data.tempat_lahir,
            tanggal_lahir: data.tanggal_lahir,
            nama_ayah: data.nama_ayah,
            pendidikan_ayah: data.pendidikan_ayah,
            pekerjaan_ayah: data.pekerjaan_ayah,
            penghasilan_ayah: data.penghasilan_ayah,
            nama_ibu: data.nama_ibu,
            pendidikan_ibu: data.pendidikan_ibu,
            pekerjaan_ibu: data.pekerjaan_ibu,
            penghasilan_ibu: data.penghasilan_ibu,
            nama_wali: data.nama_wali,
            pendidikan_wali: data.pendidikan_wali,
            pekerjaan_wali: data.pekerjaan_wali,
            penghasilan_wali: data.penghasilan_wali,
            alamat_tinggal: data.alamat_tinggal,
            telp_siswa: data.telp_siswa
        }

        const siswa = new FormData()
        siswa.append('id', isi[selectedIndex].id)
        siswa.append('nis', data.nis)
        siswa.append('status', data.status)
        siswa.append('tanggal_masuk', data.tanggal_masuk_ubah)
        siswa.append('tanggal_keluar', data.tanggal_keluar)
        siswa.append('foto_masuk', data.foto_masuk[0])
        siswa.append('foto_keluar', data.foto_keluar[0])

        const res = await link.post('Siswa/ubah', siswa)
        setRefresh(Math.random)
        const resYPS = await linkYPS.put('Siswa/detail', siswaYPS)
        setPesan(res.data.status + ' & ' + resYPS.data.status)
        setRefresh(Math.random)
    }

    async function hapus(id, idDaftar) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('Siswa/' + id)
            const resDaftar = await linkYPS.put('Siswa/daftar/' + idDaftar, { status: 0 })
            setPesan(res.data.status + ' & ' + resDaftar.data.status)
            setRefresh(Math.random)
        }
    }

    function showData(index) {
        setSelectedIndex(index)
        setValue('nama_siswa', detailIsi[index]?.nama_siswa)
        setValue('jenis_kelamin', detailIsi[index]?.jenis_kelamin)
        setValue('panggilan', detailIsi[index]?.panggilan)
        setValue('nisn', detailIsi[index]?.nisn)
        setValue('tempat_lahir', detailIsi[index]?.tempat_lahir)
        setValue('tanggal_lahir', detailIsi[index]?.tanggal_lahir)
        setValue('nama_ayah', detailIsi[index]?.nama_ayah)
        setValue('nama_ibu', detailIsi[index]?.nama_ibu)
        setValue('nama_wali', detailIsi[index]?.nama_wali)
        setValue('alamat_tinggal', detailIsi[index]?.alamat_tinggal)
        setValue('telp_siswa', detailIsi[index]?.telp_siswa)
        setValue('nis', isi[index]?.nis)
        setValue('tanggal_masuk_ubah', isi[index]?.tanggal_masuk)
        setValue('tanggal_keluar', isi[index]?.tanggal_keluar)
    }

    function setTapelSelect(e) {
        setIdTapel(e.value)
    }

    function setJenjangSelect(e) {
        setTingkat(e.value)
    }

    function setSiswaSelect(e) {
        setIdDaftar(e.value.split('/')[0])
        setIdSiswa(e.value.split('/')[1])
    }

    // batasan untuk edit
    return (
        <div className='p-3'>
            <div className="row">
                <h2>Data Siswa</h2>
            </div>
            <div className="row">
                <p>{pesan}</p>
            </div>
            <div className='row'>
                <span className='mb-2'>Pilih Tahun Pelajaran</span>
                <Select className='mb-3'
                    onChange={setTapelSelect.bind(this)}
                    options={
                        tapel.map(tapel => ({
                            value: tapel.idtapel, label: tapel.tapel
                        }))
                    }
                    placeholder={tapel[tapel.map(item => item.idtapel).indexOf(idTapel)]?.tapel}
                />
                <span className='mb-2'>Pilih Tingkat/Jenjang</span>
                <Select className='mb-3'
                    onChange={setJenjangSelect.bind(this)}
                    options={jenjang}
                    placeholder={jenjang[jenjang.map(item => item.value).indexOf(tingkat)]?.label}
                />
                <span className='mb-2'>Pilih Siswa Pendaftar</span>
                <Select className='mb-3'
                    onChange={setSiswaSelect.bind(this)}
                    options={
                        daftar.map((daftar) => ({
                            value: daftar.iddaftar + '/' + daftar.idsiswa, label: daftar.nama_siswa + ' / ' + daftar.panggilan
                        }))
                    }
                    placeholder="Pilih Siswa"
                />
            </div>
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleSubmit2(simpan)}>
                        <div className="col-12">
                            <label htmlFor="tanggal_masuk" className="form-label">Tanggal Masuk</label>
                            <input type="date" className="form-control" id="tanggal_masuk" placeholder="tanggal_masuk" {...register2("tanggal_masuk", { required: true })} />
                        </div>
                        <div className="col-4 mt-3">
                            <input type="submit" className="btn btn-primary" />
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
            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit(ubah)}>
                            <div className="modal-header text-white" style={{backgroundColor: '#2196f3'}}>
                                <h5 className="modal-title" id="exampleModalLabel">Detail Siswa</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div>
                                    <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Identitas</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Orang Tua</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Kontak</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="kesiswaan-tab" data-bs-toggle="tab" data-bs-target="#kesiswaan" type="button" role="tab" aria-controls="kesiswaan" aria-selected="false">Kesiswaan</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <div className="mb-3">
                                                <label htmlFor="nama_siswa" className="form-label">nama_siswa</label>
                                                <input type="text" className="form-control" id="nama_siswa" {...register("nama_siswa", { required: true })} />
                                            </div>
                                            <div className="mb-3">
                                                <div>
                                                    <input type="radio" id="L" value="L" {...register("jenis_kelamin", { required: true })} />
                                                    <label htmlFor="L">&nbsp;Laki-Laki </label>
                                                    <input type="radio" id="P" value="P" {...register("jenis_kelamin", { required: true })} className="ms-2" />
                                                    <label htmlFor="P">&nbsp;Perempuan </label>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="panggilan" className="form-label">Panggilan</label>
                                                <input type="text" className="form-control" id="panggilan" {...register("panggilan", { required: true })} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="nisn" className="form-label">nisn</label>
                                                <input type="text" className="form-control" id="nisn" {...register("nisn")} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="tempat_lahir" className="form-label">Tempat Lahir</label>
                                                <input type="text" className="form-control" id="tempat_lahir" {...register("tempat_lahir", { required: true })} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="tanggal_lahir" className="form-label">Tanggal Lahir</label>
                                                <input type="date" className="form-control" id="tanggal_lahir" {...register("tanggal_lahir", { required: true })} />
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <div className="mb-3">
                                                <label htmlFor="nama_ayah" className="form-label">Nama Ayah</label>
                                                <input type="text" className="form-control" id="nama_ayah" {...register("nama_ayah", { required: true })} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="pendidikan_ayah" className="form-label">Pendidikan Ayah</label>
                                                <select name="pendidikan_ayah" className="form-control" {...register("pendidikan_ayah", { required: true })}>
                                                    {
                                                        pendidikan.map((val, index) =>
                                                            index.toString() === detailIsi[selectedIndex]?.pendidikan_ayah ? (
                                                                <option key={index} value={index} selected>
                                                                    {val}
                                                                </option>
                                                            ) : (
                                                                <option key={index} value={index}>
                                                                    {val}
                                                                </option>
                                                            )
                                                        )
                                                    }
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="pekerjaan_ayah" className="form-label">Pekerjaan Ayah</label>
                                                <select name="pekerjaan_ayah" className="form-control" {...register("pekerjaan_ayah", { required: true })}>
                                                    {
                                                        pekerjaan.map((val, index) =>
                                                            index.toString() === detailIsi[selectedIndex]?.pekerjaan_ayah ? (
                                                                <option key={index} selected value={index}>
                                                                    {val}
                                                                </option>
                                                            ) : (
                                                                <option key={index} value={index}>
                                                                    {val}
                                                                </option>
                                                            )
                                                        )
                                                    }
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="penghasilan_ayah" className="form-label">Penghasilan Ayah</label>
                                                <select name="penghasilan_ayah" className="form-control" {...register("penghasilan_ayah", { required: true })}>
                                                    {
                                                        penghasilan.map((val, index) =>
                                                            index.toString() === detailIsi[selectedIndex]?.penghasilan_ayah ? (
                                                                <option key={index} selected value={index}>
                                                                    {val}
                                                                </option>
                                                            ) : (
                                                                <option key={index} value={index}>
                                                                    {val}
                                                                </option>
                                                            )
                                                        )
                                                    }
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="nama_ibu" className="form-label">Nama Ibu</label>
                                                <input type="text" className="form-control" id="nama_ibu" {...register("nama_ibu", { required: true })} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="pendidikan_ibu" className="form-label">Pendidikan Ibu</label>
                                                <select name="pendidikan_ibu" className="form-control" {...register("pendidikan_ibu", { required: true })}>
                                                    {
                                                        pendidikan.map((val, index) =>
                                                            index.toString() === detailIsi[selectedIndex]?.pendidikan_ibu ? (
                                                                <option key={index} selected value={index}>
                                                                    {val}
                                                                </option>
                                                            ) : (
                                                                <option key={index} value={index}>
                                                                    {val}
                                                                </option>
                                                            )
                                                        )
                                                    }
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="pekerjaan_ibu" className="form-label">Pekerjaan Ibu</label>
                                                <select name="pekerjaan_ibu" className="form-control" {...register("pekerjaan_ibu", { required: true })}>
                                                    {
                                                        pekerjaan.map((val, index) =>
                                                            index.toString() === detailIsi[selectedIndex]?.pekerjaan_ibu ? (
                                                                <option key={index} selected value={index}>
                                                                    {val}
                                                                </option>
                                                            ) : (
                                                                <option key={index} value={index}>
                                                                    {val}
                                                                </option>
                                                            )
                                                        )
                                                    }
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="penghasilan_ibu" className="form-label">Penghasilan Ibu</label>
                                                <select name="penghasilan_ibu" className="form-control" {...register("penghasilan_ibu", { required: true })}>
                                                    {
                                                        penghasilan.map((val, index) =>
                                                            index.toString() === detailIsi[selectedIndex]?.penghasilan_ibu ? (
                                                                <option key={index} selected value={index}>
                                                                    {val}
                                                                </option>
                                                            ) : (
                                                                <option key={index} value={index}>
                                                                    {val}
                                                                </option>
                                                            )
                                                        )
                                                    }
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="nama_wali" className="form-label">Nama Wali</label>
                                                <input type="text" className="form-control" id="nama_wali" {...register("nama_wali")} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="pendidikan_wali" className="form-label">Pendidikan Wali</label>
                                                <select name="pendidikan_wali" className="form-control" {...register("pendidikan_wali")}>
                                                    {
                                                        pendidikan.map((val, index) =>
                                                            index.toString() === detailIsi[selectedIndex]?.pendidikan_wali ? (
                                                                <option key={index} selected value={index}>
                                                                    {val}
                                                                </option>
                                                            ) : (
                                                                <option key={index} value={index}>
                                                                    {val}
                                                                </option>
                                                            )
                                                        )
                                                    }
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="pekerjaan_wali" className="form-label">Pekerjaan Wali</label>
                                                <select name="pekerjaan_wali" className="form-control" {...register("pekerjaan_wali")}>
                                                    {
                                                        pekerjaan.map((val, index) =>
                                                            index.toString() === detailIsi[selectedIndex]?.pekerjaan_wali ? (
                                                                <option key={index} selected value={index}>
                                                                    {val}
                                                                </option>
                                                            ) : (
                                                                <option key={index} value={index}>
                                                                    {val}
                                                                </option>
                                                            )
                                                        )
                                                    }
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="penghasilan_wali" className="form-label">Penghasilan Wali</label>
                                                <select name="penghasilan_wali" className="form-control" {...register("penghasilan_wali")}>
                                                    {
                                                        penghasilan.map((val, index) =>
                                                            index.toString() === detailIsi[selectedIndex]?.penghasilan_wali ? (
                                                                <option key={index} selected value={index}>
                                                                    {val}
                                                                </option>
                                                            ) : (
                                                                <option key={index} value={index}>
                                                                    {val}
                                                                </option>
                                                            )
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                            <div className="mb-3">
                                                <label htmlFor="alamat_tinggal" className="form-label">Alamat Tinggal</label>
                                                <input type="text" className="form-control" id="alamat_tinggal" {...register("alamat_tinggal", { required: true })} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="telp_siswa" className="form-label">Telp Siswa</label>
                                                <input type="text" className="form-control" id="telp_siswa" {...register("telp_siswa", { required: true })} />
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="kesiswaan" role="tabpanel" aria-labelledby="kesiswaan-tab">
                                            <div className="mb-3">
                                                <label htmlFor="nis" className="form-label">NIS</label>
                                                <input type="text" className="form-control" id="nis" {...register("nis")} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="status" className="form-label">Status</label>
                                                <select name="status" className="form-control" {...register("status", { required: true })}>
                                                    {
                                                        status.map((val, index) =>
                                                            val.value === isi[selectedIndex]?.status ? (
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
                                            <div className="mb-3">
                                                <label htmlFor="tanggal_masuk_ubah" className="form-label">Tanggal Masuk</label>
                                                <input type="date" className="form-control" id="tanggal_masuk_ubah" {...register("tanggal_masuk_ubah", { required: true })} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="tanggal_keluar" className="form-label">Tanggal Keluar</label>
                                                <input type="date" className="form-control" id="tanggal_keluar" {...register("tanggal_keluar")} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="foto_masuk" className="form-label">Foto Masuk</label><br />
                                                <img src={isi[selectedIndex]?.foto_masuk} alt="" width="100" height="100" />
                                                <input type="file" className="form-control mt-2" id="foto_masuk" {...register("foto_masuk")} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="foto_keluar" className="form-label">Foto Keluar</label><br />
                                                <img src={isi[selectedIndex]?.foto_keluar} alt="" width="100" height="100" />
                                                <input type="file" className="form-control mt-2" id="foto_keluar" {...register("foto_keluar")} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Siswa
