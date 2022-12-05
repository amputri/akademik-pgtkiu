import React, { useEffect, useState } from 'react'
import { linkYPS, pendidikanGuru, statusKepegawaian } from '../../Axios/link'
import { useForm } from 'react-hook-form'

const Beranda = () => {
    const [guru, setGuru] = useState([])
    const { register, handleSubmit, setValue } = useForm()

    useEffect(() => {
        getGuru() // eslint-disable-next-line
    }, [])

    async function getGuru() {
        const res = await linkYPS.get(`Guru/guruById/${sessionStorage.getItem('idguru')}`)
        setGuru(res.data)
        setValue('nama', res.data.nama)
        setValue('tempat_lahir', res.data.tempat_lahir)
        setValue('tanggal_lahir', res.data.tanggal_lahir)
        setValue('jenis_kelamin', res.data.jenis_kelamin)
        setValue('nik', res.data.nik)
        setValue('detail_pendidikan', res.data.detail_pendidikan)
        setValue('alamat', res.data.alamat)
        setValue('telp', res.data.telp)
        setValue('telp_alternatif', res.data.telp_alternatif)
        setValue('username', res.data.username)
    }

    async function ubah(data) {
        let pass = sessionStorage.getItem('password')
        if (data.passwordbaru !== '' && data.passwordbaru === data.konfirmasipassword && pass === data.password) {
            pass = data.passwordbaru
        }

        sessionStorage.setItem('password', pass)
        console.log(pass)
        window.location.reload()
    }

    return (
        <div>
            <form onSubmit={handleSubmit(ubah)}>
                <div className="text-center pb-5 text-white pt-2" style={{backgroundColor: '#2196f3'}}>
                    <h3>Detail Data Guru</h3>
                </div>
                <div className="text-center" style={{marginTop:'-50px'}}>
                    <img className='rounded-circle' src={guru.foto} style={{border: '3px solid #2196f3'}} alt="" width="150" height="150" />
                </div>

                <div className="row">

                    <div className="modal-body">
                        <div>
                            <ul className="nav nav-tabs mb-2" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Data Diri</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Data Kontak</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Data Kepegawaian</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="kesiswaan-tab" data-bs-toggle="tab" data-bs-target="#kesiswaan" type="button" role="tab" aria-controls="kesiswaan" aria-selected="false">Data Akun</button>
                                </li>
                            </ul>
                            <div className="tab-content px-3" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="mb-3">
                                        <label htmlFor="nama" className="form-label">Nama</label>
                                        <input type="text" className="form-control" id="nama" {...register("nama", { required: true })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tempat_lahir" className="form-label">Tempat Lahir</label>
                                        <input type="text" className="form-control" id="tempat_lahir" {...register("tempat_lahir", { required: true })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tanggal_lahir" className="form-label">Tanggal Lahir</label>
                                        <input type="date" className="form-control" id="tanggal_lahir" {...register("tanggal_lahir", { required: true })} />
                                    </div>
                                    <div className="mb-3">
                                        <div>
                                            <input type="radio" id="L" value="L" {...register("jenis_kelamin", { required: true })} />
                                            <label htmlFor="L"> Laki-Laki </label>
                                            <input type="radio" id="P" value="P" {...register("jenis_kelamin", { required: true })} className="ms-2" />
                                            <label htmlFor="P"> Perempuan </label>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="nik" className="form-label">NIK</label>
                                        <input type="text" className="form-control" id="nik" {...register("nik", { required: true })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="pendidikan" className="form-label">Pendidikan</label>
                                        <select name="pendidikan" className="form-control" {...register("pendidikan", { required: true })}>
                                            {
                                                pendidikanGuru.map((val, index) =>
                                                    index.toString() === guru.pendidikan ? (
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
                                        <label htmlFor="detail_pendidikan" className="form-label">Detail Pendidikan</label>
                                        <input type="text" className="form-control" id="detail_pendidikan" {...register("detail_pendidikan", { required: true })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="foto" className="form-label">Foto</label>
                                        <input type="file" className="form-control" id="foto" {...register("foto")} />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="mb-3">
                                        <label htmlFor="alamat" className="form-label">Alamat</label>
                                        <input type="text" className="form-control" id="alamat" {...register("alamat", { required: true })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="telp" className="form-label">Telp</label>
                                        <input type="text" className="form-control" id="telp" {...register("telp", { required: true })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="telp_alternatif" className="form-label">Telp Alternatif</label>
                                        <input type="text" className="form-control" id="telp_alternatif" {...register("telp_alternatif", { required: true })} />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                    <div className="mb-3">
                                        <span>Status: {statusKepegawaian[guru.status - 1]}</span>
                                    </div>
                                    <div className="mb-3">
                                        <span>Tanggal Masuk: {guru.tanggal_masuk}</span>
                                    </div>
                                    <div className="mb-3">
                                        <span>Tanggal Tetap: {guru.tanggal_tetap}</span>
                                    </div>
                                    <div className="mb-3">
                                        <span>NIY: {guru.niy}</span>
                                    </div>
                                    <div className="mb-3">
                                        <span>NUPTK: {guru.nuptk}</span>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="kesiswaan" role="tabpanel" aria-labelledby="kesiswaan-tab">
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input type="text" className="form-control" id="username" {...register("username")} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" {...register("password")} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="passwordbaru" className="form-label">Password Baru</label>
                                        <input type="password" className="form-control" id="passwordbaru" {...register("passwordbaru")} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="konfirmasipassword" className="form-label">Konfirmasi Password</label>
                                        <input type="password" className="form-control" id="konfirmasipassword" {...register("konfirmasipassword")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">Simpan</button>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default Beranda
