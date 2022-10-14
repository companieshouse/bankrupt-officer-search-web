import { BankruptOfficerSearchResults, PageItem, PaginationData } from '../../types';
import { SCOTTISH_BANKRUPT_OFFICER, ADD_TO_FRONT, ADD_TO_END, RESULTS_PER_PAGE } from '../../config';
import { Resource } from "api-sdk-node";
import { logger } from '../../utils';

const addPageItem = (items: PageItem[], pageNumber: number, operation: string, current: boolean) => {
  let page: PageItem;
  page = {
    number: pageNumber,
    href: `${SCOTTISH_BANKRUPT_OFFICER}?page=${pageNumber}`, 
  }
  if (current) page.current = true;
  switch (operation) {
    case ADD_TO_FRONT: items.unshift(page); break;
    case ADD_TO_END: items.push(page); break;
    default: logger.info("Pagination: Unidentified operation during addPageItem: " + operation);
  }
}

const buildLeftSide = (paginationData: PageItem[], actualPage: number) => {
  let pagesAdded = 0;
  let currentPage = actualPage - 1;
  while (pagesAdded < 2 && currentPage >= 1) {
    addPageItem(paginationData, currentPage, ADD_TO_FRONT, false);
    currentPage--;
    pagesAdded++;
  }
  if (currentPage === 1) {
    addPageItem(paginationData, currentPage, ADD_TO_FRONT, false);
  }
  if (paginationData[0].number !== 1) {
    paginationData.unshift({
      ellipsis: true
    })
    addPageItem(paginationData, 1, ADD_TO_FRONT, false);
  }
}

const buildRightSide = (paginationData: PageItem[], actualPage: number, numOfPages: number) => {
  let pagesAdded = 0;
  let currentPage = actualPage + 1;
  while (pagesAdded < 2 && currentPage <= numOfPages) {
    addPageItem(paginationData, currentPage, ADD_TO_END, false);
    currentPage++;
    pagesAdded++;
  }
  if (currentPage === numOfPages) {
    addPageItem(paginationData, currentPage, ADD_TO_END, false);
  }
  if (paginationData[paginationData.length-1].number !== numOfPages) {
    paginationData.push({
      ellipsis: true
    })
    addPageItem(paginationData, numOfPages, ADD_TO_END, false);
  }
}

export const buildPaginationData = (searchResults: Resource<BankruptOfficerSearchResults>): PaginationData =>  {
  const {startIndex = 0, totalResults = 0, itemsPerPage = 0} = searchResults.resource || {};
          
  const pagination: PaginationData = {items: []}; 
  const actualPage = startIndex + 1; // index starts at 0 so need to add 1 to get the actual page number
  const paginationData: PageItem[] = [];

  const numOfPages = Math.ceil(totalResults / itemsPerPage);
  if (actualPage !== 1) pagination.previous = {href: `${SCOTTISH_BANKRUPT_OFFICER}?page=${actualPage-1}`}
  if (actualPage !== numOfPages) pagination.next = {href: `${SCOTTISH_BANKRUPT_OFFICER}?page=${actualPage+1}`}

  // If there are less than 8 pages, just display all the links
  if (numOfPages < 8) {
    for (let i = 0; i<numOfPages; i++) {
      const pageNumber: number = i + 1;
      const current = pageNumber === actualPage;
      addPageItem(paginationData, pageNumber, ADD_TO_END, current);
    }
  } else {
    addPageItem(paginationData, actualPage, ADD_TO_END, true);
    buildLeftSide(paginationData, actualPage);
    buildRightSide(paginationData, actualPage, numOfPages);
  }
  pagination.items = paginationData;
  return pagination;
}