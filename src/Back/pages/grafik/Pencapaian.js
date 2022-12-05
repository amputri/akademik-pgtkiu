import React, { useState, useEffect } from 'react'
import { link, linkYPS, nilaiHuruf, jenjang } from '../../../Axios/link'
import Select from 'react-select'
import DataTable from "react-data-table-component"
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css"
import Chart from "react-google-charts"

const Pencapaian = (props) => {
    const [tingkat, setTingkat] = useState(0)
    const [capaian, setCapaian] = useState([])
    const [idCapaian, setIdCapaian] = useState(0)
    const [subCapaian, setSubCapaian] = useState([])
    const [idSubCapaian, setIdSubCapaian] = useState(0)
    const [nilaiPencapaian, setNilaiPencapaian] = useState([])
    const [siswa, setSiswa] = useState([])
    const [data, setData] = useState([])
    const [dataColumn, setDataColumn] = useState([])

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
            name: "Siswa",
            selector: "nama_siswa",
            sortable: true
        },
        {
            name: "Pencapaian",
            selector: "pencapaian",
            sortable: true
        }
    ]

    useEffect(() => {
        getCapaian() // eslint-disable-next-line
    }, [props.idtapel, tingkat])

    useEffect(() => {
        getSubCapaian() // eslint-disable-next-line
    }, [idCapaian])

    useEffect(() => {
        getNilaiPencapaian() // eslint-disable-next-line
    }, [props.idtapel, props.semester, idSubCapaian])

    useEffect(() => {
        setIsiTabel() // eslint-disable-next-line
    }, [nilaiPencapaian, siswa])

    async function getCapaian() {
        const res = await link.get('Capaian/' + props.idtapel + '/' + tingkat)

        var obj = [] // eslint-disable-next-line
        res.data.map((val, index) => {
            obj.push({ value: val.id, label: `${val.nomor_capaian}. ${val.capaian}` }) // eslint-disable-next-line
            val.sub.map((val2, index2) => {
                obj.push({ value: val2.id, label: `>>${val2.nomor_capaian}. ${val2.capaian}` }) // eslint-disable-next-line
                val2.sub.map((val3, index3) => {
                    obj.push({ value: val3.id, label: `>>>>${val3.nomor_capaian}. ${val3.capaian}` })
                })
            })
        })
        setCapaian(obj)
    }

    function setJenjangSelect(e) {
        setTingkat(e.value)
    }

    function setCapaianSelect(e) {
        setIdCapaian(e.value)
    }

    async function getSubCapaian() {
        const res = await link.get('Subcapaian/' + idCapaian)
        setSubCapaian(res.data)
    }

    function setSubCapaianSelect(e) {
        setIdSubCapaian(e.value)
    }

    async function getNilaiPencapaian() {
        const res = await link.get(`Nilaicapaian/rekap/${idSubCapaian}/${props.semester}/${props.idtapel}/${tingkat}`)
        setNilaiPencapaian(res.data)
        getSiswaWithDetail(res.data)
    }

    async function getDetailSiswa(idSiswa) {
        const res = await linkYPS.get(`Siswa/detail/${idSiswa}`)
        return res.data
    }

    async function getSiswaWithDetail(siswa) {
        const withDetail = await Promise.all(siswa.map(siswa => getDetailSiswa(siswa.ref_siswa)))
        setSiswa(withDetail)
    }

    function setIsiTabel() {
        let nomor = 1
        const dataSementara = nilaiPencapaian.map((val, index) => ({
            no: nomor++,
            kelas: val.nama_kelas,
            nama_siswa: siswa[index]?.nama_siswa,
            pencapaian: nilaiHuruf[val.nilai - 1]
        }))
        setData(dataSementara)

        let rekap = [0, 0, 0] // eslint-disable-next-line
        nilaiPencapaian.map((val, index) => {
            rekap[0] += val.nilai === "3" ? 1 : 0
            rekap[1] += val.nilai === "2" ? 1 : 0
            rekap[2] += val.nilai === "1" ? 1 : 0
        })
        const dataColumnSementara = [
            [
                "Pencapaian",
                "Jumlah Siswa",
            ],
            ["A", rekap[0]],
            ["B", rekap[1]],
            ["C", rekap[2]],
        ]
        setDataColumn(dataColumnSementara)

    }

    const options = {
        title: "Grafik Rekap Pencapaian Siswa",
        vAxis: { title: "Jumlah Siswa" },
        hAxis: { title: "Pencapaian" },
        seriesType: "bars"
    }


    return (
        <div>
            <div className='row'>
                <span className='mb-2'>Pilih Jenjang</span>
                <Select className='mb-3'
                    onChange={setJenjangSelect.bind(this)}
                    options={jenjang}
                    placeholder="Pilih Jenjang"
                />
                <span className='mb-2'>Pilih Capaian</span>
                <Select className='mb-3'
                    onChange={setCapaianSelect.bind(this)}
                    options={capaian}
                    placeholder="Pilih Capaian"
                />
                <span className='mb-2'>Pilih Sub Capaian</span>
                <Select className='mb-3'
                    onChange={setSubCapaianSelect.bind(this)}
                    options={
                        subCapaian.map(i => ({
                            value: i.id, label: i.subcapaian
                        }))
                    }
                    placeholder="Pilih Sub Capaian"
                />
            </div>
            <div className="row">
                <Chart
                    chartType="ComboChart"
                    width="100%"
                    height="400px"
                    data={dataColumn}
                    options={options}
                />
            </div>
            <hr />
            <div className="row">
                <h5>Tabel Rekap Pencapaian</h5>
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

export default Pencapaian
