import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

const Side = () => {
    const { url } = useRouteMatch()
    const currentURL = window.location.href

    return (
        <div>
            <div className='bg-white shadow-sm vh-100' style={{ position: 'fixed', width: '300px' }}>
                <div>
                    <img src={process.env.PUBLIC_URL + '/logo.png'} alt="" width="100%" />
                </div>
                <div className="card-header">
                    Menu Utama
                </div>
                <ul className="list-group list-group-flush">
                    <Link to={`${url}/beranda`} className={currentURL.includes('/beranda') ? "text-decoration-none text-blue ps-3 mt-3" : 'text-decoration-none text-black ps-3 mt-3'}><i className="fa fa-dashboard pe-3" />Beranda</Link>
                    <Link to={`${url}/kelas`} className={currentURL.includes('/kelas') ? "text-decoration-none text-blue ps-3 mt-3" : 'text-decoration-none text-black ps-3 mt-3'}><i className="fa fa-fort-awesome pe-3" />Kelas</Link>
                    <Link to={`${url}/siswa`} className={currentURL.includes('/siswa') ? "text-decoration-none text-blue ps-3 mt-3" : 'text-decoration-none text-black ps-3 mt-3'}><i className="fa fa-address-card pe-4" />Siswa</Link>
                    <Link to={`${url}/rombelkelas`} className={currentURL.includes('/rombel') ? "text-decoration-none text-blue ps-3 mt-3" : 'text-decoration-none text-black ps-3 mt-3'}><i className="fa fa-users pe-3" />Rombel</Link>
                    <Link to={`${url}/bidangpengembangan`} className={currentURL.includes('/bidangpengembangan') ? "text-decoration-none text-blue ps-3 mt-3" : currentURL.includes('indikator') ? "text-decoration-none text-blue ps-3 mt-3" : 'text-decoration-none text-black ps-3 mt-3'}><i className="fa fa-edit pe-3" />Bidang Pengembangan</Link>
                    <Link to={`${url}/capaian`} className={currentURL.includes('/capaian') ? "text-decoration-none text-blue ps-3 mt-3" : currentURL.includes('/subcapaian') ? "text-decoration-none text-blue ps-3 mt-3" : 'text-decoration-none text-black ps-3 mt-3'}><i className="fa fa-edit pe-3" />Pencapaian</Link>
                    <Link to={`${url}/rapotrombel`} className={currentURL.includes('/rapot') ? "text-decoration-none text-blue ps-3 mt-3" : 'text-decoration-none text-black ps-3 mt-3'}><i className="fa fa-book pe-4" />Rapot</Link>
                    <Link to={`${url}/grafik`} className={currentURL.includes('/grafik') ? "text-decoration-none text-blue ps-3 mt-3" : 'text-decoration-none text-black ps-3 mt-3'}><i className="fa fa-bar-chart pe-4" />Rekap Nilai</Link>
                </ul>
            </div>
        </div>
    )
}

export default Side
