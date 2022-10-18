import { buildPaginationData } from "../../src/utils";
import { expect } from 'chai';

describe('Pagination test suite', () => {
  const prefix = "prefix";

  it('Should not add ellipses when the number of pages is less than 9', () => {
    const numOfPages = 4;
    const currentPage = 2;
    const paginationData = buildPaginationData(currentPage, numOfPages, prefix);
    const expectedData = {
      "items":[
        {"number":1,"href":"prefix?page=1"},
        {"number":2,"href":"prefix?page=2","current":true},
        {"number":3,"href":"prefix?page=3"},
        {"number":4,"href":"prefix?page=4"}
      ],
      "previous":{"href":"prefix?page=1"},
      "next":{"href":"prefix?page=3"}
    }
    expect(paginationData).to.deep.equal(expectedData);
  });

  it('Should add an ellipsis in the end when the number of pages is 9 or larger and the current page is < 5', () => {
    const numOfPages = 10;
    const currentPage = 4;
    const paginationData = buildPaginationData(currentPage, numOfPages, prefix);
    const expectedData = {
      "items":[
        {"number":1,"href":"prefix?page=1"},
        {"number":2,"href":"prefix?page=2"},
        {"number":3,"href":"prefix?page=3"},
        {"number":4,"href":"prefix?page=4","current":true},
        {"number":5,"href":"prefix?page=5"},
        {"number":6,"href":"prefix?page=6"},
        {"number":7,"href":"prefix?page=7"},
        {"number":8,"href":"prefix?page=8"},
        {"ellipsis":true},
        {"number":10,"href":"prefix?page=10"}
      ],
      "previous":{"href":"prefix?page=3"},
      "next":{"href":"prefix?page=5"}
    }
    expect(paginationData).to.deep.equal(expectedData);
  });

  it('Should add an ellipsis at the front when the number of pages is 9 or larger and the difference between the last page and the current page is < 5', () => {
    const numOfPages = 10;
    const currentPage = 7;
    const paginationData = buildPaginationData(currentPage, numOfPages, prefix);
    const expectedData = {
      "items":[
        {"number":1,"href":"prefix?page=1"},
        {"ellipsis":true},
        {"number":4,"href":"prefix?page=4"},
        {"number":5,"href":"prefix?page=5"},
        {"number":6,"href":"prefix?page=6"},
        {"number":7,"href":"prefix?page=7","current":true},
        {"number":8,"href":"prefix?page=8"},
        {"number":9,"href":"prefix?page=9"},
        {"number":10,"href":"prefix?page=10"}
      ],
      "previous":{"href":"prefix?page=6"},
      "next":{"href":"prefix?page=8"}
    }
    expect(paginationData).to.deep.equal(expectedData);
  });

  it('Should add ellipses at both sides when the number of pages > 9 and the current page is around the middle', () => {
    const numOfPages = 11;
    const currentPage = 6;
    const paginationData = buildPaginationData(currentPage, numOfPages, prefix);
    const expectedData = {
      "items":[
        {"number":1,"href":"prefix?page=1"},
        {"ellipsis":true},
        {"number":4,"href":"prefix?page=4"},
        {"number":5,"href":"prefix?page=5"},
        {"number":6,"href":"prefix?page=6","current":true},
        {"number":7,"href":"prefix?page=7"},
        {"number":8,"href":"prefix?page=8"},
        {"ellipsis":true},
        {"number":11,"href":"prefix?page=11"}
      ],
      "previous":{"href":"prefix?page=5"},
      "next":{"href":"prefix?page=7"}}
    expect(paginationData).to.deep.equal(expectedData);
  });
});