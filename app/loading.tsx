import loader from '@/assets/loader.gif';
import Image from 'next/image';

function LoadingPage() {
  return ( 
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 9999,
    }}>
      <Image src={loader} alt="Loading..." width={150} height={150} />
    </div>
   );
}

export default LoadingPage;