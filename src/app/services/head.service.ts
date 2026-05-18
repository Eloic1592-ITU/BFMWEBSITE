import {Injectable} from '@angular/core';
import {Title, Meta, MetaDefinition} from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})

export class HeadService {

    constructor(private titleService: Title,
                private meta: Meta) {
    }

    public setPageTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }
    public updateMetaTags(
        newTitle: string,
        newDesc: string,
        urlPage: string,
        urlImg: string
    ) {
        // update title
        this.meta.updateTag({property: 'og:title', content: newTitle});
        this.meta.updateTag({name: 'twitter:title', content: newTitle});

        // upadate desctiption
        if((newDesc != null) && (newDesc.length > 1)){
            this.meta.updateTag({property: 'og:description', content: newDesc});
            this.meta.updateTag({name: 'twitter:description', content: newDesc});
            this.meta.updateTag({itemprop: 'description', content: newDesc});
        }

        // update image
        if((urlImg !=null) && (urlImg.length > 1)){
            this.meta.updateTag({property: 'og:image', content: urlImg});
            this.meta.updateTag({name: 'twitter:card', content: urlImg});
            this.meta.updateTag({itemprop: 'image', content: urlImg});

        }

        // Update URL
        if((urlPage != null) && (urlPage.length > 1)){
            this.meta.updateTag({property: 'og:url', content: urlPage});
            this.meta.updateTag({name: 'twitter:url', content: urlPage});
            this.meta.updateTag({itemprop: 'image', content: urlPage});
        }

    }
}
