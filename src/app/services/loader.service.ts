import {ComponentFactoryResolver, Inject, Injectable} from '@angular/core';
import { TabeauCoursDevisesComponent } from "../components/cours-devises-filter/tabeau-cours-devises/tabeau-cours-devises.component";
@Injectable()
export class LoaderService {
    private rootViewContainer: any;

    constructor(@Inject(ComponentFactoryResolver) private factoryResolver) {
        this.factoryResolver = factoryResolver;
    }
    setRootViewContainerRef(viewContainerRef) {
        this.rootViewContainer = viewContainerRef;
    }

    addDynamicComponent() {
        const factory = this.factoryResolver
            .resolveComponentFactory(TabeauCoursDevisesComponent)
        const component = factory
            .create(this.rootViewContainer.parentInjector)
        this.rootViewContainer.insert(component.hostView)
        component.instance.var1 = "Merci";
    }
}
