import React from 'react'
import { linkYPS } from '../Axios/link'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const { register, handleSubmit, reset } = useForm()

    const history = useHistory()

    async function login(data) {
        const res = await linkYPS.post('Guru/login', data)

        if (res.data.status === 200) {
            sessionStorage.setItem('token', 'ahdshfhsjfiajsofjsdhf')
            sessionStorage.setItem('idguru', res.data.data.idguru)
            sessionStorage.setItem('password', data.password)
        }

        console.log(res.data)

        reset()

        if (getToken() === 'ahdshfhsjfiajsofjsdhf') {
            history.push('/admin/beranda')
            window.location.reload()
        }
    }

    if (sessionStorage.getItem('token') === 'ahdshfhsjfiajsofjsdhf') {
        history.push('/admin/beranda')
        window.location.reload()
    }

    const getToken = () => (sessionStorage.getItem('token'))

    return (
        <div>
            <section className="vh-100" style={{ backgroundColor: '#2196f3' }}>
                <div className="container py-5 h-100">
                    <div className="row mb-3">
                        <span className='text-center text-white fw-bold fs-2'>TKIU EL-HAQ</span>
                        <span className='text-center text-white fs-6'>Sistem Informasi TKIU El-Haq Sidoarjo</span>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="card text-bg-primary mb-3" style={{ maxWidth: '25rem' }}>
                            <div className="card-body" style={{ borderRadius: '5rem' }}>
                                <div className="row mt-2">
                                    <span className='mb-3 text-center' style={{fontSize:'14px'}}>Harap Login untuk Memulai Session Anda</span>
                                    <div className="mx-auto col-12">
                                        <form onSubmit={handleSubmit(login)}>
                                            <div className="form-group mb-2">
                                                <label htmlFor="username">Username</label>
                                                <input type="text" className="form-control" name="username" {...register("username", { required: true })} />
                                            </div>
                                            <div className="form-group mb-2">
                                                <label htmlFor="password">Password</label>
                                                <input type="password" className="form-control" name="password" {...register("password", { required: true })} />
                                            </div>
                                            <div className="pt-2 mb-6">
                                                <button type="submit" className="btn form-control text-white" style={{backgroundColor: '#e91e63'}}>Login</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
