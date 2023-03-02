import ReactLoading from "react-loading"

export default function LoadingScreen(){
    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center">
            <ReactLoading type="bars" color="#3d5fd7" height={100} width={50} />
        </div>
    )
}