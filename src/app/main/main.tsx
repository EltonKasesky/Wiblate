import Banner from '@/components/main/Banner';
import Gender from '@/components/main/Gender';
import NetworkStructure from '../../components/main/NetworkStructure';
import Dados from '../../components/main/DatabaseSection';
import ProgrammingLogic from '../../components/main/Logic';
import Hardware from '../../components/main/Hardware';
import NetworkSlide from '../../components/main/NetworkSlide';
import useLocation from '@/components/LocationDisplay';
import Movies from '@/components/main/Movies';



export default function Main() {
  useLocation()
  return (
    <>
      <div className='py-8 bg-body-bg-light dark:bg-body-bg-dark'>
        <Banner />
        <Gender />
        <Movies id="movies-section" />
        <ProgrammingLogic id="logic" />
        <Dados id="database-section" />
        <Hardware id="hardware-section" />
        <NetworkSlide />
        <NetworkStructure id="network-structure" />
      </div>
    </>
  );
}
