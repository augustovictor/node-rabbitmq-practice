### Scenario

- It is a supermarket where people are queued waiting for their turn to checkout items.

- Each checkout should inform the central panel that it is available.

- The supervisor can send messages to a specific checkout people or all of them. Some times they might ask for a time-consuming task for all of them. However there is no specification on how it should be distributed.
    - Some messages can be sent to new employees only.
    - Also some messages can be sent to veteran employees only.
    - There is a central manager panel where the supervisor can see the live logs of all checkouts.
        - Checkouts over $1000 should have a special format its own queue;