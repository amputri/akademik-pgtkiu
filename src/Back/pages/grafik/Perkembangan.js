import React, { useState, useEffect } from 'react'
import { link, linkYPS, komentarCapaian } from '../../../Axios/link'
import Select from 'react-select'
import DataTable from "react-data-table-component"
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css"
import Chart from "react-google-charts"

const Perkembangan = (props) => {
    const [bidangPengembangan, setBidangPengembangan] = useState([])
    const [idBidangPengembangan, setIdBidangPengembangan] = useState(0)
    const [indikator, setIndikator] = useState([])
    const [idIndikator, setIdIndikator] = useState(0)
    const [nilaiPengembangan, setNilaiPengembangan] = useState([])
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
            name: "Perkembangan",
            selector: "perkembangan",
            sortable: true
        }
    ]

    useEffect(() => {
        getBidangPengembangan() // eslint-disable-next-line
    }, [props.idtapel])

    useEffect(() => {
        getIndikator() // eslint-disable-next-line
    }, [idBidangPengembangan])

    useEffect(() => {
        getNilaiPengembangan() // eslint-disable-next-line
    }, [props.idtapel, props.semester, idIndikator])

    useEffect(() => {
        setIsiTabel() // eslint-disable-next-line
    }, [nilaiPengembangan, siswa])

    async function getBidangPengembangan() {
        const res = await link.get('Bidangpengembangan/' + props.idtapel)
        setBidangPengembangan(res.data)
    }

    function setBidangPengembanganSelect(e) {
        setIdBidangPengembangan(e.value)
    }

    async function getIndikator() {
        const res = await link.get('Indikator/' + idBidangPengembangan)
        setIndikator(res.data)
    }

    function setIndikatorSelect(e) {
        setIdIndikator(e.value)
    }

    async function getNilaiPengembangan() {
        const res = await link.get(`Nilaipengembangan/rekap/${idIndikator}/${props.semester}/${props.idtapel}`)
        setNilaiPengembangan(res.data)
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
        const dataSementara = nilaiPengembangan.map((val, index) => ({
            no: nomor++,
            kelas: val.nama_kelas,
            nama_siswa: siswa[index]?.nama_siswa,
            perkembangan: komentarCapaian[val.nilai - 1]
        }))
        setData(dataSementara)

        let rekap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // eslint-disable-next-line
        nilaiPengembangan.map((val, index) => {
            if (val.tingkat === "0") {
                rekap[0] += val.nilai === "1" ? 1 : 0
                rekap[1] += val.nilai === "2" ? 1 : 0
                rekap[2] += val.nilai === "3" ? 1 : 0
                rekap[3] += val.nilai === "4" ? 1 : 0
            } else if (val.tingkat === "2") {
                rekap[4] += val.nilai === "1" ? 1 : 0
                rekap[5] += val.nilai === "2" ? 1 : 0
                rekap[6] += val.nilai === "3" ? 1 : 0
                rekap[7] += val.nilai === "4" ? 1 : 0
            } else if (val.tingkat === "4") {
                rekap[8] += val.nilai === "1" ? 1 : 0
                rekap[9] += val.nilai === "2" ? 1 : 0
                rekap[10] += val.nilai === "3" ? 1 : 0
                rekap[11] += val.nilai === "4" ? 1 : 0
            }
        })
        const dataColumnSementara = [
            [
                "Perkembangan",
                "Play Group",
                "TK A",
                "TK B",
            ],
            ["Belum Berkembang", rekap[0], rekap[4], rekap[8]],
            ["Mulai Berkembang", rekap[1], rekap[5], rekap[9]],
            ["Berkembang Sesuai Harapan", rekap[2], rekap[6], rekap[10]],
            ["Berkembang Sangat Baik", rekap[3], rekap[7], rekap[11]],
        ]
        setDataColumn(dataColumnSementara)

    }

    const options = {
        title: "Grafik Rekap Perkembangan Siswa",
        vAxis: { title: "Jumlah Siswa" },
        hAxis: { title: "Perkembangan" },
        seriesType: "bars"
    }


    return (
        <div>
            <div className='row'>
                <span className='mb-2'>Pilih Bidang Pengembangan</span>
                <Select className='mb-3'
                    onChange={setBidangPengembanganSelect.bind(this)}
                    options={
                        bidangPengembangan.map(bp => ({
                            value: bp.id, label: bp.bidang_pengembangan
                        }))
                    }
                    placeholder="Pilih Bidang Pengembangan"
                />
                <span className='mb-2'>Pilih Indikator</span>
                <Select className='mb-3'
                    onChange={setIndikatorSelect.bind(this)}
                    options={
                        indikator.map(i => ({
                            value: i.id, label: i.indikator
                        }))
                    }
                    placeholder="Pilih Indikator"
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
                <h5>Tabel Rekap Perkembangan</h5>
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

export default Perkembangan
