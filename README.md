# StockCalculator

This is an exercise project for practicing development. It is implemented in Angular (7.0.2)

The program calculates ledgers for articles based on inputted transaction data.


# Known Limitations

Please note that all amounts are rounded to two decimal points.


Parsing of data sets without column names in the first line has not been implemented due to time constraints.
However, the transaction parser has been setup to detect when the column names are missing and call a different parsing function.
That missing function contians a comment in code explaining what the intent was, had there been more time


The UI is *extremely* basic, there just wasn't enough time to make it prettier.

Unit test coverage is decent for the Transaction model, but lackluster for parsing service.
The parser contains just two unit tests with known good and bad data, for easy checks to see if parser is generally working fine
The tests do not show where the problem is, at this time.


Different currencies are supported by models and parser, however, the UI ignores any currency variations for now.
This is trivial to add as a new dimension to the Total model on the UI side, however, once again - time constraints :)


In a production app: the total calculating logic would be extracted to a service of it's own, there would be a logging mechanism used, more unit and end to end test cases implemented, minor speed optimizaitons could easily be introduced to the parser.
All of these are once again lacking from this exercise due to lack of time to implement them properly for this exercise.



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## End-to-end tests

End to end tests have not been implemented due to time constraints
