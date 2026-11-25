# Print Queue Lab

[Open the simulator](https://imran-data-studio.warmessay64.chatgpt.site/print-queue/index.html)

A discrete-event simulation for a small large-format print studio. Compare arrival order, shortest job first, and earliest deadline first on twelve synthetic print orders. Switch between one and two presses and inspect the job-level dispatch log.

## Reproduce

Run `python -m http.server 8000` from the repository directory, then open http://localhost:8000. The browser app requires no dependencies. Run `node verify.mjs` with Node 20+ to run the checks and reproduce [the results](results.json).

## Worked result

With one press, shortest job first averaged 85.8 minutes from arrival to completion, compared with 143.8 for arrival order. It reduced late orders from ten to three, but the longest overdue job finished 180 minutes late. Earliest deadline first limited the longest delay to 70 minutes. With two presses, all twelve orders finished on time under each rule.

## Model

The order book is a deliberately fictional scenario created for this project. Each decision dispatches an available order to the first free press. Ties use arrival time, then order ID. Jobs run to completion, and press time includes no changeover or breakdowns. Average turnaround includes both queue time and printing. Late orders finish strictly after their due time. These scenario results illustrate scheduling trade-offs rather than a forecast for a real shop.

The verification script checks all six scenarios for job coverage, rule choice, release times, processing duration, and non-overlap. Small hand-calculated fixtures cover idle time, deadline equality, and parallel capacity.
