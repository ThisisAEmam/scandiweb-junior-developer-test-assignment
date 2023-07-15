# scandiweb | Junior Developer | Test Assignment

This repository is for the test assignment of scandiweb's junior developer position. Feel free to test it using this [link](http://104.248.240.190:9001/).

## Setup the project in your local machine

To use the project in your local machine, please follow the steps below:

1. Install _docker_ and _docker-compose_.
2. Clone this repo to your machine.

```bash
git clone https://github.com/ThisisAEmam/scandiweb-junior-developer-test-assignment.git
```

3. Navigate to the project directory.

```bash
cd scandiweb-junior-developer-test-assignment
```

4. Download the _.env_ file and move it the root directory of the project (next to _docker-compose.yml_ file). The _.env_ file is found [here](https://drive.google.com/file/d/1KG57tBoaMG4A2JzaUYloaTNtrq9T6qkN/view?usp=drive_link).
5. Start docker comtainers using the terminal command below.

```bash
docker-compose up -d --build --force-recreate
```

To stop the containers from running, use the terminal command below.

```bash
docker-compose down
```

**Note:** to delete the containers' volumes while stopping them, use _-v_ flag as shown in the following line:

```bash
docker-compose down -v
```

6. To access project's client in your browser, use [http://localhost:9001/](http://localhost:9001/).
