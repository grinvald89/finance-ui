import * as moment from 'moment';

export class Period {
    private readonly startDate: moment.Moment;
    private readonly endDate: moment.Moment;

    constructor(startDate: moment.Moment, endDate: moment.Moment) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    get StartDate(): moment.Moment {
        return this.startDate;
    }

    get EndDate(): moment.Moment {
        return this.endDate;
    }
}