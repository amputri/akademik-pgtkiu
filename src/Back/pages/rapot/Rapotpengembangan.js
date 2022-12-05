import React, { useState, useEffect } from 'react'
import { link } from '../../../Axios/link'
import { useForm } from 'react-hook-form'
import { useLocation, Link } from 'react-router-dom'
import Select from 'react-select'

const Rapotpengembangan = () => {
    const location = useLocation()

    const [bidangPengembangan, setBidangPengembangan] = useState([])
    const [indikator, setIndikator] = useState([])
    const [semester, setSemester] = useState()
    const { register, handleSubmit, setValue, reset } = useForm()
    const [pesan, setPesan] = useState('')
    const [refresh, setRefresh] = useState(Math.random)
    const [fotoPengembangan, setFotoPengembangan] = useState([])

    useEffect(() => {
        setSemesterAwal()
        getBidangPengembangan() // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getAbsenFisik()
        getFotoPengembangan()
        getNilaiPengembangan() // eslint-disable-next-line
    }, [refresh, semester, bidangPengembangan, indikator])

    function setSemesterAwal() {
        const date = new Date()
        const month = date.getMonth()
        month >= 0 && month <= 5 ? setSemester(2) : setSemester(1)
    }

    async function getBidangPengembangan() {
        const res = await link.get('Bidangpengembangan/' + location.state?.idtapel)
        setBidangPengembangan(res.data)
        getBidangPengembanganWithIndikator(res.data)
    }

    async function getIndikator(idBidangPengembangan) {
        const res = await link.get('Indikator/' + idBidangPengembangan)
        return res.data
    }

    async function getBidangPengembanganWithIndikator(bidangPengembangan) {
        const withDetail = await Promise.all(bidangPengembangan.map(bp => getIndikator(bp.id)))
        setIndikator(withDetail)
    }

    async function getNilaiPengembangan() {
        const res = await link.get(`Nilaipengembangan/${location.state?.idsiswarombel}/${semester}`)
        bidangPengembangan.map((val, index) =>
            indikator[index]?.map(val2 =>
                setValue(`i${val2.id}`, res.data[res.data.map(item => item.idindikator).indexOf(val2.id)]?.nilai)
            )
        )
    }

    async function getFotoPengembangan() {
        const res = await link.get(`Fotopengembangan/${location.state?.idsiswarombel}/${semester}`)
        setFotoPengembangan(res.data)
    }

    async function getAbsenFisik() {
        const res = await link.get(`Absenfisik/${location.state?.idsiswarombel}/${semester}`)
        setValue('sakit', res.data[0]?.sakit)
        setValue('izin', res.data[0]?.izin)
        setValue('alpha', res.data[0]?.alpha)
        setValue('tinggibadan', res.data[0]?.tinggibadan)
        setValue('beratbadan', res.data[0]?.beratbadan)
        setValue('lingkarkepala', res.data[0]?.lingkarkepala)
    }

    async function simpan(data) {
        let status = true

        bidangPengembangan.map(async (val, index) => {
            indikator[index].map(async val2 => {
                let nilai = {
                    idsiswarombel: location.state?.idsiswarombel,
                    idindikator: val2.id,
                    semester: semester,
                    nilai: data[`i${val2.id}`]
                }

                const resNilai = await link.post('Nilaipengembangan', nilai)
                status = !resNilai.data.status ? false : status
                setRefresh(Math.random)
            })

            let foto = new FormData()
            foto.append('idsiswarombel', location.state?.idsiswarombel)
            foto.append('idbidangpengembangan', val.id)
            foto.append('semester', semester)
            foto.append('foto', data[`bp${val.id}`][0])

            const resFoto = await link.post('Fotopengembangan', foto)
            status = !resFoto.data.status ? false : status
            setRefresh(Math.random)
        })

        let absenFisik = {
            idsiswarombel: location.state?.idsiswarombel,
            semester: semester,
            sakit: data.sakit,
            izin: data.izin,
            alpha: data.alpha,
            tinggibadan: data.tinggibadan,
            beratbadan: data.beratbadan,
            lingkarkepala: data.lingkarkepala
        }
        const resAbsenFisik = await link.post('Absenfisik', absenFisik)
        status = !resAbsenFisik.data.status ? false : status

        setPesan(!status ? "gagal" : "berhasil")
        setRefresh(Math.random)
        reset()
    }

    function setSemesterSelect(e) {
        setSemester(e.value)
    }

    async function hapus() {
        let status = true

        if (window.confirm('yakin akan menghapus?')) {
            const resNilai = await link.delete(`Nilaipengembangan/${location.state?.idsiswarombel}/${semester}`)
            status = !resNilai.data.status ? false : status

            const resFoto = await link.delete(`Fotopengembangan/${location.state?.idsiswarombel}/${semester}`)
            status = !resFoto.data.status ? false : status

            const resAbsenFisik = await link.delete(`Absenfisik/${location.state?.idsiswarombel}/${semester}`)
            status = !resAbsenFisik.data.status ? false : status

            setPesan(!status ? "gagal" : "berhasil")
            setRefresh(Math.random)
            reset()
        }
    }

    return (
        <div className='p-3'>
            <div className="row">
                <h2>Data Nilai Pengembangan Siswa</h2>
                <p>{pesan}</p>
                <p>Tahun Pelajaran : {location.state?.tapel}</p>
                <p>Kelas : {location.state?.namakelas}</p>
                <p>Wali Kelas : {location.state?.walas}</p>
                <p>Pendamping : {location.state?.pendamping}</p>
                <p>Nama Siswa : {location.state?.siswa}</p>
                <p>
                    <Link className="btn btn-success" to={{
                        pathname: "/admin/rapotrombel",
                        state: {
                            idtapel: location.state?.idtapel,
                            idrombel: location.state?.idrombel,
                            tingkat: location.state?.tingkat,
                            namakelas: location.state?.namakelas
                        }
                    }} replace><i className="fa fa-arrow-left" /> Kembali</Link>
                </p>
            </div>
            <div className='row mb-4'>
                <span>Semester</span>
                <Select
                    onChange={setSemesterSelect.bind(this)}
                    options={
                        [
                            { value: 1, label: "1" },
                            { value: 2, label: "2" }
                        ]
                    }
                    placeholder={semester}
                />
            </div>
            <div className="row">
                <form onSubmit={handleSubmit(simpan)}>
                    {
                        bidangPengembangan.map((val, index) => (
                            <table className='table table-bordered mb-4' key={`bp` + index}>
                                <thead>
                                    <tr>
                                        <td className='fw-bold table-primary' colSpan={3}>Bidang Pengembangan {val.bidang_pengembangan}</td>
                                    </tr>
                                    <tr className='table-success'>
                                        <th>No</th>
                                        <th>Indikator</th>
                                        <th>Nilai</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        indikator[index]?.map((val2, index2) => (
                                            <tr key={`i` + index2} className='table-secondary'>
                                                <td>{val2.nomor_indikator}</td>
                                                <td>{val2.indikator}</td>
                                                <td>
                                                    <div className="range">
                                                        <input type="range" min="1" max="4" id={`i${val2.id}`} {...register(`i${val2.id}`, { required: true })} className="slider" />
                                                        <div className="sliderticks">
                                                            <span>BB</span>
                                                            <span>MB</span>
                                                            <span>BSH</span>
                                                            <span>BSB</span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    <tr className='table-primary'>
                                        <td colSpan={3}>
                                            <div className="row">
                                                <div className="col-3">
                                                    <img src={fotoPengembangan[fotoPengembangan.map(item => item.idbidangpengembangan).indexOf(val.id)]?.foto} alt="" width="100" height="100" />
                                                </div>
                                                <div className="col-9">
                                                    <input type="file" className="form-control" id={`bp${val.id}`} {...register(`bp${val.id}`)} />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        ))
                    }
                    <table className='table table-bordered mb-4'>
                        <tbody>
                            <tr>
                                <td className='fw-bold table-success' colSpan={2}>Ketidakhadiran</td>
                            </tr>
                            <tr className='table-secondary'>
                                <td><label htmlFor="sakit" className="form-label">Sakit</label></td>
                                <td><input type="number" className="form-control" id="sakit" {...register("sakit")} /></td>
                            </tr>
                            <tr className='table-secondary'>
                                <td><label htmlFor="izin" className="form-label">Izin</label></td>
                                <td><input type="number" className="form-control" id="izin" {...register("izin")} /></td>
                            </tr>
                            <tr className='table-secondary'>
                                <td><label htmlFor="alpha" className="form-label">Alpha</label></td>
                                <td><input type="number" className="form-control" id="alpha" {...register("alpha")} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <table className='table table-bordered mb-4'>
                        <tbody>
                            <tr>
                                <td className='fw-bold table-success' colSpan={2}>Kesehatan Fisik</td>
                            </tr>
                            <tr className='table-secondary'>
                                <td><label htmlFor="tinggibadan" className="form-label">Tinggi Badan (cm)</label></td>
                                <td><input type="text" className="form-control" id="tinggibadan" {...register("tinggibadan")} /></td>
                            </tr>
                            <tr className='table-secondary'>
                                <td><label htmlFor="beratbadan" className="form-label">Berat Badan (kg)</label></td>
                                <td><input type="text" className="form-control" id="beratbadan" {...register("beratbadan")} /></td>
                            </tr>
                            <tr className='table-secondary'>
                                <td><label htmlFor="lingkarkepala" className="form-label">Lingkar Kepala (cm)</label></td>
                                <td><input type="text" className="form-control" id="lingkarkepala" {...register("lingkarkepala")} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mb-3">
                        <input type="submit" value='Simpan' className="btn btn-primary me-3" />
                        <button onClick={() => hapus()} className="btn btn-danger">Reset/Hapus Penilaian</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Rapotpengembangan
