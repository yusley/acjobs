import Modal from 'react-modal'


const customStyles = {
    content: {
        width: '100%',
        maxWidth: "500px",
        borderRadius: '10px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
};

function ModalComponent ({...props}) {
    
    
    return (
        <div>
          <Modal
            isOpen={props.isOpen}
            onRequestClose={props.close}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className='w-full'>
                <div className='title border-b-1 py-2 border-gray-400 my-3'>
                    <h2>{props.title}</h2>
                </div>
                
                <div className='body w-full py-10 border-b-1 border-gray-400 my-3'>
                    <p>
                        {props.message}
                    </p>
                </div>

                <div className='body w-full flex flex-row-reverse gap-10'>
                    <button onClick={props.close} className='w-[6rem] p-[2%] bg-[#ff2f2f] text-[#fff] cursor-pointer'>
                        Fechar
                    </button>
                    <button onClick={props.action} className='w-[6rem] p-[2%] bg-[#1FA774] text-[#fff] cursor-pointer'>
                        Confirmar
                    </button>
                    
                </div>
            </div>
          </Modal>
        </div>
      );
}

export default ModalComponent;