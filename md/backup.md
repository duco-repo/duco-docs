::mermaid

flowchart TB
subgraph Machine\["Machine Side"]
  M1\[Machine Sensors]
  M2\[DUCO App]
  M1 -->|Raw Data per second| M2
end
subgraph Cloud\["Cloud Ingestion"]
  IOT\[Azure IoT Hub]
  ING\[Ingestor Server]
  META\[MetaAPI Parsing Logic]
  CH\[(ClickHouse)]
  KAFKA\[(Kafka)]
M2 -->|vehicle_can / client_raw_data| IOT
IOT -->|Raw Data| ING
ING --> META
META -->|Parsed Data| CH
META -->|Parsed Data| KAFKA
IOT <-->|Mqtt Receive Command & Response Result| M2
end
subgraph Metaapi\["Metaapi Server"]
  METAAPI\[API Server]
METAAPI -->|Get Parsed Data Logic| META
METAAPI <-->|MQTT Send Command& Response Result/ACK| IOT
end
subgraph Distribution\["Distribution Layer"]
  DIST\[Distributor Server]
  REDIS\[(Redis Pub/Sub)]
end
KAFKA --> DIST
DIST -->|realTime data| REDIS
subgraph Studio\["DUCO Studio Server"]
  API\[DUCO Studio API]
  WS\[WebSocket Service]
API -->|Request Metaapi| METAAPI
end
REDIS -->|topic:live-stream/**tenantId**/consumer-**chassisId**/**msgType**| WS
subgraph Frontend\["DUCO Studio Frontend"]
  PAGE\["Live Data Page"]
  ECHARTS\[ECharts Line Charts]
end
PAGE -->|Request last 2 minutes data| API
PAGE -->|Request Proxy MetaAPI| API
PAGE -->|Create WebSocket Connection & Send INIT_FIELD_LIST| WS
API -->|Query historical data| CH
API -->|Initial Echarts data| ECHARTS
API -->|Get Metaapi data| PAGE
CH -->|Get Historical data past 2 min| API
WS -->|Filtered Live Data| ECHARTS
ECHARTS -->|Render Charts| PAGE
::


::mermaid

flowchart TB
subgraph Machine\["Device / Machine Side"]
  M1\[Machine Sensors]
  M2\[DUCO App]
  M1 -->|Raw Data per second| M2
end
subgraph Cloud\["Cloud Ingestion"]
  IOT\[Azure IoT Hub]
  ING\[Ingestor Server]
  META\[MetaAPI Parsing Logic]
  CH\[(ClickHouse)]
  KAFKA\[(Kafka)]
  REDIS\[(Redis Pub/Sub)]
  REDIS_S\[(Redis Stream)]
M2 -->|vehicle_can / client_raw_data| IOT
IOT -->|Raw Data| ING
ING --> META
META -->|Parsed Data| CH
META -->|Parsed Data| KAFKA
META -->|Parsed Data -> Pub| REDIS
META -.->|Parsed Data -> stream| REDIS_S
linkStyle 6 stroke:#FFA500,stroke-width:2px
linkStyle 7 stroke:#00aa88,stroke-width:2px
end
subgraph Metaapi\["Metaapi Server"]
  METAAPI\[API Server]
METAAPI -->|Get Parsed Data Logic| META
end
subgraph Studio\["DUCO Studio Server"]
  API\[DUCO Studio API Proxy]
  WS\[WebSocket Service]
end
REDIS -->|Sub live-stream/*| WS
REDIS_S -.->| Sub stream| WS
linkStyle 9 stroke:#FFA500,stroke-width:2px
linkStyle 10 stroke:#00aa88,stroke-width:2px
subgraph Frontend\["DUCO Studio Frontend"]
  PAGE\["Live Data Page
UI Mounted"]
  ECHARTS\[ECharts Line Charts]
end
API -->|Initial Echarts data| ECHARTS
CH -->|Get 2 min data| API
REDIS_S -.->|Get 2 mins data| API
WS -->|Filtered Live Data| ECHARTS
ECHARTS -->|Render Charts| PAGE
PAGE -->|Create WebSocket and Send INIT_FIELD_LIST| WS
linkStyle 12 stroke:#FFA500,stroke-width:2px
linkStyle 13 stroke:#00aa88,stroke-width:2px
::
