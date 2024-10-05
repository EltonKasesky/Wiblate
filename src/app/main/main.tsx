import Banner from '@/components/main/Banner';
import Gender from '@/components/main/Gender';
import NetworkStructure from '../../components/main/NetworkStructure';
import Dados from '../../components/main/DatabaseSection';
import ProgrammingLogic from '../../components/main/Logic';
import Hardware from '../../components/main/Hardware';
import NetworkSlide from '../../components/main/NetworkSlide';

export default function Main() {
  return (
    <>
      <div className='py-8 bg-body-bg-light dark:bg-body-bg-dark'>
        <Banner />
        <Gender />
        <ProgrammingLogic id="logic" />
        <Dados id="database-section" />
        <Hardware id="hardware-section" />
        <NetworkSlide />
        <NetworkStructure id="network-structure" />
      </div>
    </>
  );
}