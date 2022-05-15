/*
- Transform data using streams
- Data taken from https://www.kaggle.com/jboysen/london-crime/
- Columns: lsoa_code,borough,major_category,minor_category,value,year,month
- Data ommited for brevity
*/
import { createReadStream } from 'fs'
import { parse } from "csv-parse"
import { Transform, PassThrough, pipeline } from "stream"

const csvParser = parse({ columns: true })
const FILE = "london_crime_by_lsoa.csv"

/*
// TRANSFORM CLASSES
*/

// 범죄유형 필터
class FilterByCrime extends Transform {
    constructor(major_category, options = {}){
        options.objectMode = true
        super(options)
        this.major_category = major_category
    }

    _transform(record,enc,cb){
        if(record.major_category === this.major_category){
            this.push(record)
        }
        cb()
    }
}

// 지역필터
class FilterByLocation extends Transform {
    constructor(borough, options = {}){
        options.objectMode = true
        super(options)
        this.borough = borough
    }

    _transform(record,enc,cb){
        if(record.borough === this.borough){
            this.push(record)
        }
        cb()
    }
}

// 연도별 필터
class FilterByYear extends Transform {
    constructor(year, options = {}){
        options.objectMode = true
        super(options)
        this.year = year
    }

    _transform(record,enc,cb){
        if(record.year === this.year){
            this.push(record)
        }
        cb()
    }
}

/*
// METHODS
*/

const main = () => {
    const yearSet = new Set()
    const crimeMajorCategorySet = new Set()
    const locationSet = new Set()
    pipeline(
        createReadStream(FILE),
        csvParser,
        new Transform({ //Collect set Transforms
            objectMode: true,
            transform(record, enc,cb){
                console.log(record)
                yearSet.add(record.year)
                crimeMajorCategorySet.add(record.major_category)
                locationSet.add(record.borough)
                cb()
            }
        }),
        //Apply Filters Here
        new FilterByYear("2010"),
        new FilterByLocation("Lambeth"),
        (err)=>{
            console.log(err)
        }
    )

}
main()