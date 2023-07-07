import '../BlockPagination/BlockPagination.scss';
import myIcons from '../../icons/free-icon-arrow-right-2267883.png'

export interface BlockPaginationProps{
    prevPage(): void;
    nextPage(): void;
    numberPage: number;
    ref?: HTMLElement|null | undefined
}

function BlockPagination({prevPage, nextPage, numberPage}: BlockPaginationProps){
   return(
    <div className='main__block__pagination'>
    <div className='main__block__arrow'  >
        <img onClick={prevPage} src={myIcons} style={{transform: 'rotate(180deg)'}} alt="стрелочка" />
    </div>
    <div className='main__block__page'>{numberPage}</div>
    <div className='main__block__arrow' >
          <img onClick={nextPage} src={myIcons} alt="стрелочка" />
    </div>
</div>
   )
}

export default BlockPagination;