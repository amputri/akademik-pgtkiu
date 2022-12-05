import React, { useState, useEffect, useRef } from 'react'
import { link, linkYPS, komentarCapaian } from '../../../Axios/link'
import { Link, useLocation } from 'react-router-dom'
import Select from 'react-select'
import Biodata from './Biodata'
import { useReactToPrint } from "react-to-print";
import Rapot from './Rapot'

const Rapotrombel = () => {
    const location = useLocation()

    const componentRef = useRef()
    const rapotRef = useRef()

    const [tapel, setTapel] = useState([])
    const [idTapel, setIdTapel] = useState()
    const [rombel, setRombel] = useState([])
    const [idRombel, setIdRombel] = useState()
    const [tingkat, setTingkat] = useState()
    const [namaKelas, setNamaKelas] = useState()
    const [kelas, setKelas] = useState([])
    const [siswaRombel, setSiswaRombel] = useState([])
    const [siswa, setSiswa] = useState([])
    const [detailIsi, setDetailIsi] = useState([])
    const [guru, setGuru] = useState([])
    const [selectedDetail, setSelectedDetail] = useState(0)
    const [selectedSiswa, setSelectedSiswa] = useState(0)
    const [selectedSemester, setSelectedSemester] = useState(0)
    const [bidangPengembangan, setBidangPengembangan] = useState([])
    const [indikator, setIndikator] = useState([])
    const [nilaiPengembangan, setNilaiPengembangan] = useState([])
    const [komentarBidang, setKomentarBidang] = useState([])
    const [fotoPengembangan, setFotoPengembangan] = useState([])
    const [absenFisik, setAbsenFisik] = useState([])
    const [capaian, setCapaian] = useState([])
    const [subcapaian, setSubcapaian] = useState([])
    const [nilaiCapaian, setNilaiCapaian] = useState([])
    const [capaianMengaji, setCapaianMengaji] = useState([])

    useEffect(() => {
        getTapel()
        getGuru()
        getKelas() // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getBidangPengembangan()
        getCapaian()
        getRombel() // eslint-disable-next-line
    }, [idTapel])

    useEffect(() => {
        getSiswarombel()
        getSiswa() // eslint-disable-next-line
    }, [idRombel])

    async function getTapel() {
        const res = await linkYPS.get('Tapel')
        setTapel(res.data)
        // eslint-disable-next-line
        res.data.map((value, index) => {
            const date = new Date()
            const month = date.getMonth()
            const year = date.getFullYear().toString()
            if ((month >= 0 && month <= 5 && value.tapel?.split('/')[1] === year) || (month >= 6 && month <= 11 && value.tapel?.split('/')[0] === year)) {
                setIdTapel(location.state?.idtapel ? location.state?.idtapel : value.idtapel)
            }
        })
    }

    async function getRombel() {
        const res = await link.get(`Rombel/${idTapel}`)
        setRombel(res.data)
        setIdRombel(location.state?.idrombel ? location.state?.idrombel : res.data[0]?.id)
        setTingkat(location.state?.tingkat ? location.state?.tingkat : kelas[kelas.map(item => item.id).indexOf(res.data[0]?.id_kelas)]?.tingkat)
        setNamaKelas(location.state?.namakelas ? location.state?.namakelas : kelas[kelas.map(item => item.id).indexOf(res.data[0]?.id_kelas)]?.nama_kelas)
    }

    async function getKelas() {
        const res = await link.get('Kelas')
        setKelas(res.data)
    }

    async function getSiswarombel() {
        const res = await link.get(`Siswarombel/${idRombel}`)
        setSiswaRombel(res.data)
    }

    async function getSiswa() {
        const res = await link.get(`Siswa/${idTapel}/${tingkat}`)
        setSiswa(res.data)
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

    async function getGuru() {
        const res = await linkYPS.get(`Guru/guruPGTKIU`)
        setGuru(res.data)
    }

    function setTapelSelect(e) {
        setIdTapel(e.value)
    }

    function setRombelSelect(e) {
        setIdRombel(e.value.split('/')[0])
        setTingkat(e.value.split('/')[1])
        setNamaKelas(e.value.split('/')[2])
    }

    function setPrint(detail, siswa) {
        setSelectedDetail(detail)
        setSelectedSiswa(siswa)
    }

    function setPrintSatu(detail, siswa, idSiswaRombel) {
        setSelectedDetail(detail)
        setSelectedSiswa(siswa)
        setSelectedSemester(1)
        getNilaiPengembangan(idSiswaRombel, 1)
        getFotoPengembangan(idSiswaRombel, 1)
        getAbsenFisik(idSiswaRombel, 1)
        getNilaiCapaian(idSiswaRombel, 1)
        getCapaianMengaji(idSiswaRombel, 1)
    }

    function setPrintDua(detail, siswa, idSiswaRombel) {
        setSelectedDetail(detail)
        setSelectedSiswa(siswa)
        setSelectedSemester(2)
        getNilaiPengembangan(idSiswaRombel, 2)
        getFotoPengembangan(idSiswaRombel, 2)
        getAbsenFisik(idSiswaRombel, 2)
        getNilaiCapaian(idSiswaRombel, 2)
        getCapaianMengaji(idSiswaRombel, 2)
    }

    async function getBidangPengembangan() {
        const res = await link.get('Bidangpengembangan/' + idTapel)
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

    async function getNilaiPengembangan(idSiswa, semester) {
        const res = await link.get(`Nilaipengembangan/${idSiswa}/${semester}`)
        setNilaiPengembangan(res.data)

        setKomentar(res.data)
    }

    async function getFotoPengembangan(idSiswa, idSemester) {
        const res = await link.get(`Fotopengembangan/${idSiswa}/${idSemester}`)
        setFotoPengembangan(res.data)
    }

    async function getAbsenFisik(idSiswa, semester) {
        const res = await link.get(`Absenfisik/${idSiswa}/${semester}`)
        setAbsenFisik(res.data[0])
    }

    async function getCapaian() {
        const res = await link.get(`Capaian/${idTapel}/${tingkat}`)
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

    async function getNilaiCapaian(idSiswa, semester) {
        const res = await link.get(`Nilaicapaian/${idSiswa}/${semester}`)
        setNilaiCapaian(res.data)
    }

    async function getCapaianMengaji(idSiswa, semester) {
        const res = await link.get(`Capaianummitahfidz/${idSiswa}/${semester}`)
        setCapaianMengaji(res.data[0])
    }

    async function setKomentar(nilaiPengembangan) {
        let komentar = []

        bidangPengembangan.map(async (val, index) => {
            let max = 1
            let min = 4
            let komentarMax = ''
            let komentarMin = ''

            indikator[index].map(async (val2, index2) => {
                let nilai = nilaiPengembangan[nilaiPengembangan.map(item => item.idindikator).indexOf(val2.id)]?.nilai
                if (nilai === max) {
                    komentarMax = komentarMax + val2.indikator + '; '
                } else if (nilai > max) {
                    komentarMax = 'Alhamdulillah, Ananda ' + komentarCapaian[nilai - 1] + ' dalam hal ' + val2.indikator + '; '
                    max = nilai
                }

                if (nilai === min) {
                    komentarMin = komentarMin + val2.indikator + '; '
                } else if (nilai < min) {
                    komentarMin = 'Ananda ' + komentarCapaian[nilai - 1] + ' dalam hal ' + val2.indikator + '; '
                    min = nilai
                }
            })


            komentar[index] = min === max ? komentarMax : komentarMax + komentarMin
        })

        setKomentarBidang(komentar)
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })

    const rapotPrint = useReactToPrint({
        content: () => rapotRef.current
    })

    let no = 1
    // batasan untuk edit
    return (
        <div className='p-3'>
            <div className="row">
                <h2>Data Nilai Rapot Siswa</h2>
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
                    placeholder={tapel[tapel.map(item => item.idtapel).indexOf(idTapel)]?.tapel}
                />
            </div>
            <div className='row mt-2'>
                <span>Pilih Rombongan Belajar</span>
                <Select
                    onChange={setRombelSelect.bind(this)}
                    options={
                        rombel.map(rombel => ({
                            value: rombel.id + '/' + kelas[kelas.map(item => item.id).indexOf(rombel.id_kelas)]?.tingkat + '/' + kelas[kelas.map(item => item.id).indexOf(rombel.id_kelas)]?.nama_kelas, label: kelas[kelas.map(item => item.id).indexOf(rombel.id_kelas)]?.nama_kelas
                        }))
                    }
                    placeholder={kelas[kelas.map(item => item.id).indexOf(rombel[0]?.id_kelas)]?.nama_kelas}
                />
            </div>
            <div className="row mt-2">
                <p>Wali Kelas:  {guru[guru.map(item => item.idguru).indexOf(rombel[rombel.findIndex(p => p.id === idRombel)]?.walas)]?.nama}</p>
                <p>Pendamping:  {guru[guru.map(item => item.idguru).indexOf(rombel[rombel.findIndex(p => p.id === idRombel)]?.pendamping)]?.nama}</p>
            </div>
            <div className="row">
                <table className="table mt-2">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Siswa</th>
                            <th>Nilai Pengembangan</th>
                            <th>Nilai Pencapaian</th>
                            <th>Cetak Rapot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            siswaRombel.map((val, index) => (
                                <tr key={index}>
                                    <td>{no++}</td>
                                    <td>{detailIsi[detailIsi.map(item => item.idsiswa).indexOf(val.ref_siswa)]?.nama_siswa}</td>
                                    <td>
                                        <Link className='text-white p-2 rounded text-decoration-none' style={{ backgroundColor: '#2196f3' }} to={{
                                            pathname: "/admin/rapotpengembangan",
                                            state: {
                                                idtapel: idTapel,
                                                idrombel: idRombel,
                                                tingkat: tingkat,
                                                tapel: tapel[tapel.map(item => item.idtapel).indexOf(idTapel)]?.tapel,
                                                namakelas: namaKelas,
                                                walas: guru[guru.map(item => item.idguru).indexOf(rombel[rombel.findIndex(p => p.id === idRombel)]?.walas)]?.nama,
                                                pendamping: guru[guru.map(item => item.idguru).indexOf(rombel[rombel.findIndex(p => p.id === idRombel)]?.pendamping)]?.nama,
                                                siswa: detailIsi[detailIsi.map(item => item.idsiswa).indexOf(val.ref_siswa)]?.nama_siswa,
                                                idsiswarombel: val.id
                                            }
                                        }} replace><i className="fa fa-edit" /> Pengembangan</Link>
                                    </td>
                                    <td>
                                        <Link className='text-white p-2 rounded text-decoration-none' style={{ backgroundColor: '#e91e63' }} to={{
                                            pathname: "/admin/rapotpencapaian",
                                            state: {
                                                idtapel: idTapel,
                                                idrombel: idRombel,
                                                tingkat: tingkat,
                                                tapel: tapel[tapel.map(item => item.idtapel).indexOf(idTapel)]?.tapel,
                                                namakelas: namaKelas,
                                                walas: guru[guru.map(item => item.idguru).indexOf(rombel[rombel.findIndex(p => p.id === idRombel)]?.walas)]?.nama,
                                                pendamping: guru[guru.map(item => item.idguru).indexOf(rombel[rombel.findIndex(p => p.id === idRombel)]?.pendamping)]?.nama,
                                                siswa: detailIsi[detailIsi.map(item => item.idsiswa).indexOf(val.ref_siswa)]?.nama_siswa,
                                                idsiswarombel: val.id
                                            }
                                        }} replace><i className="fa fa-edit" /> Pencapaian</Link>
                                    </td>
                                    <td>
                                        <button onMouseDown={() => setPrint(detailIsi.map(item => item.idsiswa).indexOf(val.ref_siswa), siswa.map(item => item.id_siswa).indexOf(val.ref_siswa))} onMouseUp={handlePrint}>Biodata</button>
                                        <button onMouseDown={() => setPrintSatu(detailIsi.map(item => item.idsiswa).indexOf(val.ref_siswa), siswa.map(item => item.id_siswa).indexOf(val.ref_siswa), val.id)} onDoubleClick={rapotPrint}>Smt 1</button>
                                        <button onMouseDown={() => setPrintDua(detailIsi.map(item => item.idsiswa).indexOf(val.ref_siswa), siswa.map(item => item.id_siswa).indexOf(val.ref_siswa), val.id)} onDoubleClick={rapotPrint}>Smt 2</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div style={{ display: "none" }}>
                <Biodata
                    ref={componentRef}
                    detail={detailIsi[selectedDetail]}
                    siswa={siswa[selectedSiswa]}
                    kelas={namaKelas}
                    tingkat={tingkat}
                />
                <Rapot
                    ref={rapotRef}
                    semester={selectedSemester}
                    detail={detailIsi[selectedDetail]}
                    siswa={siswa[selectedSiswa]}
                    tapel={tapel[tapel.map(item => item.idtapel).indexOf(idTapel)]}
                    kepsek={guru[guru.map(item => item.idguru).indexOf(tapel[tapel.findIndex(p => p.idtapel === idTapel)]?.kepsek)]?.nama}
                    idRombel={idRombel}
                    tingkat={tingkat}
                    namaKelas={namaKelas}
                    walas={guru[guru.map(item => item.idguru).indexOf(rombel[rombel.findIndex(p => p.id === idRombel)]?.walas)]?.nama}
                    bidangPengembangan={bidangPengembangan}
                    indikator={indikator}
                    nilaiPengembangan={nilaiPengembangan}
                    fotoPengembangan={fotoPengembangan}
                    absenFisik={absenFisik}
                    capaian={capaian}
                    subcapaian={subcapaian}
                    nilaiCapaian={nilaiCapaian}
                    capaianMengaji={capaianMengaji}
                    komentarBidang={komentarBidang}
                />
            </div>
        </div>
    )
}

export default Rapotrombel
