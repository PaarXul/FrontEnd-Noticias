import { content } from './content';

export interface pageable {

  "content": content[],
    "pageable": {
        "pageNumber": number,
        "pageSize": number,
        "sort": {
            "empty": boolean,
            "sorted": boolean,
            "unsorted": boolean
        },
        "offset": number,
        "paged": boolean,
        "unpaged": boolean
    },
    "last": boolean,
    "totalPages": number,
    "totalElements": number,
    "first": boolean,
    "numberOfElements": number,
    "size": number,
    "number": number,
    "sort": {
        "empty": boolean,
        "sorted": boolean,
        "unsorted": boolean
    },
    "empty": boolean
}
