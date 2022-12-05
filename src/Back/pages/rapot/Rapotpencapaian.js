import React, { useState, useEffect } from 'react'
import { link, surah, jilid } from '../../../Axios/link'
import { useForm } from 'react-hook-form'
import { useLocation, Link } from 'react-router-dom'
import Select from 'react-select'

const Rapotpencapaian = () => {
    const location = useLocation()
    const [capaian, setCapaian] = useState([])
    const [subcapaian, setSubcapaian] = useState([])
    const { register, handleSubmit, setValue, reset } = useForm()
    const [semester, setSemester] = useState()
    const [pesan, setPesan] = useState('')
    const [refresh, setRefresh] = useState(Math.random)
    const [capaianMengaji, setCapaianMengaji] = useState([])

    let no = 0

    useEffect(() => {
        setSemesterAwal()
        getCapaian() // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getCapaianMengaji()
        getNilaiCapaian() // eslint-disable-next-line
    }, [refresh, semester, capaian, subcapaian])

    function setSemesterAwal() {
        const date = new Date()
        const month = date.getMonth()
        month >= 0 && month <= 5 ? setSemester(2) : setSemester(1)
    }

    async function getCapaian() {
        const res = await link.get(`Capaian/${location.state?.idtapel}/${location.state?.tingkat}`)
        setCapaian(res.data)
        getCapaianWithSubcapaian(res.data)
    }

    async function getSubcapaian(idCapaian) {
        const res = await link.get('Subcapaian/' + idCapaian)
        return res.data
    }

    async function getCapaianWithSubcapaian(capaian) {
        let idCapaian = []

        capaian.map(async val => {
            idCapaian.push(val.id)
            val.sub.map(async val2 => {
                idCapaian.push(val2.id)
                val2.sub.map(val3 => idCapaian.push(val3.id))
            })
        })

        const withDetail = await Promise.all(idCapaian.map(id => getSubcapaian(id)))
        setSubcapaian(withDetail)
    }

    async function getNilaiCapaian() {
        const res = await link.get(`Nilaicapaian/${location.state?.idsiswarombel}/${semester}`)
        res.data.map(val => setValue(`sn${val.idsubcapaian}`, val.nilai))
    }

    async function getCapaianMengaji() {
        const res = await link.get(`Capaianummitahfidz/${location.state?.idsiswarombel}/${semester}`)
        setCapaianMengaji(res.data[0])
        setValue('nilaitahfidz', res.data[0]?.nilaitahfidz)
        setValue('nilaiummi', res.data[0]?.nilaiummi)
    }

    async function simpan(data) {
        let status = true

        subcapaian.map(async val => {
            val.map(async val2 => {
                let nilai = {
                    idsiswarombel: location.state?.idsiswarombel,
                    semester: semester,
                    idsubcapaian: val2.id,
                    nilai: data[`sn${val2.id}`]
                }

                const resNilai = await link.post('Nilaicapaian', nilai)
                status = !resNilai.data.status ? false : status
                setRefresh(Math.random)
            })
        })

        let nilaiMengaji = {
            idsiswarombel: location.state?.idsiswarombel,
            semester: semester,
            surah: data.surah,
            nilaitahfidz: data.nilaitahfidz,
            jilid: data.jilid,
            nilaiummi: data.nilaiummi
        }
        const resNilaiMengaji = await link.post('Capaianummitahfidz', nilaiMengaji)
        status = !resNilaiMengaji.data.status ? false : status

        setPesan(!status ? "gagal" : "berhasil")
        setRefresh(Math.random)
    }

    function setSemesterSelect(e) {
        setSemester(e.value)
    }

    async function hapus() {
        let status = true

        if (window.confirm('yakin akan menghapus?')) {
            const resNilai = await link.delete(`Nilaicapaian/${location.state?.idsiswarombel}/${semester}`)
            status = !resNilai.data.status ? false : status

            const resNilaiMengaji = await link.delete(`Capaianummitahfidz/${location.state?.idsiswarombel}/${semester}`)
            status = !resNilaiMengaji.data.status ? false : status

            setPesan(!status ? "gagal" : "berhasil")
            setRefresh(Math.random)
            reset()
        }
    }

    return (
        <div className='p-3'>
            <div className="row">
                <h2>Data Nilai Pencapaian Siswa</h2>
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
                        capaian.map((val, index) => (
                            <table key={'c' + index} className='table table-bordered mb-4'>
                                <thead>
                                    <tr>
                                        <th className='table-primary' colSpan={2}>{val.nomor_capaian}. {val.capaian}</th>
                                    </tr>
                                    <tr className='table-success'>
                                        <th>Capaian</th>
                                        <th>Nilai</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        subcapaian[no++]?.map((val4, index4) => (
                                            <tr className='table-secondary' key={'s' + index4}>
                                                <td><span className='ps-4'>{val4.nomor_subcapaian}. {val4.subcapaian}</span></td>
                                                <td>
                                                    <div className="range">
                                                        <input type="range" min="1" max="3" id={`sn${val4.id}`} {...register(`sn${val4.id}`, { required: true })} className="slider" />
                                                        <div className="sliderticks">
                                                            <span>C</span>
                                                            <span>B</span>
                                                            <span>A</span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    {
                                        val.sub.map((val2, index2) => (
                                            <React.Fragment key={'d' + index2}>
                                                <tr className='table-secondary'>
                                                    <td colSpan={2}><span className='ps-4'>{val2.nomor_capaian}. {val2.capaian}</span></td>
                                                </tr>
                                                {
                                                    subcapaian[no++]?.map((val5, index5) => (
                                                        <tr className='table-secondary' key={'su' + index5}>
                                                            <td><span className='ps-5'>{val5.nomor_subcapaian}. {val5.subcapaian}</span></td>
                                                            <td>
                                                                <div className="range">
                                                                    <input type="range" min="1" max="3" id={`sn${val5.id}`} {...register(`sn${val5.id}`, { required: true })} className="slider" />
                                                                    <div className="sliderticks">
                                                                        <span>C</span>
                                                                        <span>B</span>
                                                                        <span>A</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                                {
                                                    val2.sub.map((val3, index3) => (
                                                        <React.Fragment key={'3' + index3}>
                                                            <tr className='table-secondary'>
                                                                <td colSpan={2}><span className='ps-5'>{val3.nomor_capaian}. {val3.capaian}</span></td>
                                                            </tr>
                                                            {
                                                                subcapaian[no++]?.map((val6, index6) => (
                                                                    <tr className='table-secondary' key={'sub' + index6}>
                                                                        <td><span className='ps-5 ms-3'>{val6.nomor_subcapaian}. {val6.subcapaian}</span></td>
                                                                        <td>
                                                                            <div className="range">
                                                                                <input type="range" min="1" max="3" id={`sn${val6.id}`} {...register(`sn${val6.id}`, { required: true })} className="slider" />
                                                                                <div className="sliderticks">
                                                                                    <span>C</span>
                                                                                    <span>B</span>
                                                                                    <span>A</span>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </React.Fragment>
                                                    ))
                                                }
                                            </React.Fragment>
                                        ))
                                    }
                                </tbody>
                            </table>
                        ))
                    }
                    <table className='table table-bordered mb-4'>
                        <thead>
                            <tr>
                                <th className='table-primary' colSpan={3}>Capaian Mengaji</th>
                            </tr>
                            <tr className='table-success'>
                                <th>Item</th>
                                <th>Capaian</th>
                                <th>Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='table-secondary'>
                                <td><label htmlFor="surah" className="form-label">Surah</label></td>
                                <td>
                                    <select name="surah" className="form-control" {...register("surah")}>
                                        {
                                            surah.map((val, index) =>
                                                index.toString() === capaianMengaji?.surah ? (
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
                                </td>
                                <td>
                                    <div className="range">
                                        <input type="range" min="1" max="3" id="nilaitahfidz" {...register("nilaitahfidz", { required: true })} className="slider" />
                                        <div className="sliderticks">
                                            <span>C</span>
                                            <span>B</span>
                                            <span>A</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className='table-secondary'>
                                <td><label htmlFor="jilid" className="form-label">Jilid</label></td>
                                <td>
                                    <select name="jilid" className="form-control" {...register("jilid")}>
                                        {
                                            jilid.map((val, index) =>
                                                index.toString() === capaianMengaji?.jilid ? (
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
                                </td>
                                <td>
                                    <div className="range">
                                        <input type="range" min="1" max="3" id="nilaiummi" {...register("nilaiummi", { required: true })} className="slider" />
                                        <div className="sliderticks">
                                            <span>C</span>
                                            <span>B</span>
                                            <span>A</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mb-3">
                        <input type="submit" value='Simpan' className="btn btn-primary me-4" />
                        <button onClick={() => hapus()} className="btn btn-danger">Reset/Hapus Pencapaian</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Rapotpencapaian
