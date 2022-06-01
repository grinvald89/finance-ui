import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullnamePipe } from '../ui/fullname.pipe';
import { CostPipe } from '../ui/cost.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FullnamePipe,
        CostPipe
    ],
    exports: [
        FullnamePipe,
        CostPipe
    ]
})
export class PipesModule { }
