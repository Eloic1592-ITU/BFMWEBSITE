/**
 * DataResponse
 *
 * object property of DataResponse
 */
export class DataResponse {
    code: string;
    message: string;
    data: any;
}

export class MenuItem {
    url: string;
    title: string;
    slug: string;
}

export class contactModel {
    name: string;
    lastname: string;
    email: string;
    job: string;
    subject: string;
    message: string;
}

export class AppNotification {
    type: string;
    message: string;
}