import { AwardItem, ArticleItem, CANFrame, ExperienceItem, Project, SkillCategory } from '../types';

export const PERSONAL_INFO = {
  name: "Yogesh Radhakrishnan",
  preferredName: "Yogesh.R",
  email: "yogeshr.de@gmail.com",
  backupEmail: "yogesh79040@gmail.com",
  phone: "+49 15510704259",
  location: {
    city: "Wismar",
    state: "Mecklenburg-Vorpommern",
    country: "Germany",
    mobility: {
      en: "Immediate relocation available across Germany (Munich, Stuttgart, Berlin, Hamburg, Ingolstadt, etc.)",
      de: "Sofortige deutschlandweite Umzugsbereitschaft (München, Stuttgart, Berlin, Hamburg, Ingolstadt usw.)"
    }
  },
  degree: {
    en: "M.Sc. Information and Electrical Engineering",
    de: "M.Sc. Informations- und Elektrotechnik"
  },
  university: "Hochschule Wismar, Germany",
  academicGrade: "1.7 (German Scale)",
  languages: [
    { name: "English", level: { en: "Fluent (C1 Professional)", de: "Fließend (C1 Verhandlungssicher)" } },
    { name: "Deutsch", level: { en: "B2 (En route to C1)", de: "B2 (Auf dem Weg zu C1)" } }
  ],
  linkedinUrl: "https://www.linkedin.com/in/yogesh2002/",
  githubUrl: "https://github.com/yogesh2002",
  status: {
    en: "Available for Werkstudent / Internship (Praktikum) / Master Thesis in Germany",
    de: "Verfügbar für Werkstudententätigkeit / Praktikum / Masterarbeit in Deutschland"
  },
  titles: {
    en: [
      "Robotics & Embedded Software Engineer",
      "ROS 2 / micro-ROS Motion Control Developer",
      "Embedded Firmware & RTOS Developer",
      "Automotive ECU & CAN FD Engineer"
    ],
    de: [
      "Robotik- & Embedded-Software-Ingenieur",
      "ROS 2 / micro-ROS Motion-Control-Entwickler",
      "Embedded-Firmware- & RTOS-Entwickler",
      "Automotive-Steuergeräte- & CAN FD-Ingenieur"
    ]
  },
  bio: {
    en: "Master’s student in Information and Electrical Engineering at Hochschule Wismar (Germany) with nearly 2 years of professional and practical experience in real-time, safety-critical embedded systems. My focus is where robotics meets embedded hardware: ROS 2 and micro-ROS integration, BLDC/FOC motor control, sensor fusion, and deterministic FreeRTOS/Zephyr firmware. On the automotive side I bring C/C++ driver development, CAN/CAN FD and UDS protocol stacks, ISO 26262-aligned ECU validation, BMS and power-electronics control firmware, and embedded HMI design with TouchGFX and Qt.",
    de: "Masterstudent der Informations- und Elektrotechnik an der Hochschule Wismar mit fast 2 Jahren beruflicher und praktischer Erfahrung in sicherheitskritischen Echtzeit-Embedded-Systemen. Mein Schwerpunkt liegt an der Schnittstelle von Robotik und Embedded-Hardware: ROS 2- und micro-ROS-Integration, BLDC/FOC-Motorregelung, Sensorfusion und deterministische FreeRTOS/Zephyr-Firmware. Im Automotive-Bereich bringe ich C/C++-Treiberentwicklung, CAN/CAN FD- und UDS-Protokollstacks, ISO 26262-orientierte Steuergeräte-Validierung, BMS- und Leistungselektronik-Firmware sowie Embedded-HMI-Design mit TouchGFX und Qt mit."
  }
};

export const PROJECTS: Project[] = [
  {
    id: "robotic-arm-foc-servo",
    title: "6-DOF Collaborative Robot Arm with FOC Joint Servos & ROS 2 MoveIt",
    subtitle: {
      en: "Distributed BLDC joint drives on CAN FD with 20 kHz field-oriented control, ros2_control integration, and model-based collision detection",
      de: "Verteilte BLDC-Gelenkantriebe über CAN FD mit 20 kHz feldorientierter Regelung, ros2_control-Integration und modellbasierter Kollisionserkennung"
    },
    category: "robotics",
    tags: ["ROS 2 / MoveIt 2", "FOC / BLDC", "CAN FD", "STM32G4", "ros2_control", "Inverse Kinematics", "MISRA C:2012"],
    summary: {
      en: "Developed the embedded motion-control stack for a 6-axis collaborative manipulator: six STM32G4 joint drives running 20 kHz field-oriented current control, synchronised over CAN FD to an STM32H7 real-time master that executes ROS 2 MoveIt 2 trajectories via a custom ros2_control hardware interface.",
      de: "Entwicklung des Embedded-Motion-Control-Stacks für einen kollaborativen 6-Achs-Manipulator: sechs STM32G4-Gelenkantriebe mit 20 kHz feldorientierter Stromregelung, über CAN FD synchronisiert mit einem STM32H7-Echtzeit-Master, der ROS 2 MoveIt 2-Trajektorien über ein eigenes ros2_control-Hardware-Interface ausführt."
    },
    challenge: {
      en: "Keeping six joints phase-synchronised within microseconds for smooth Cartesian motion, and detecting unexpected human contact fast enough for a safe stop — with cascaded current, velocity, and position loops on cost-optimised MCUs.",
      de: "Phasensynchrone Ansteuerung von sechs Gelenken im Mikrosekundenbereich für ruckfreie kartesische Bahnen sowie schnelle Erkennung unerwarteter Menschenkontakte für einen sicheren Stopp — mit kaskadierten Strom-, Drehzahl- und Lageregelkreisen auf kostenoptimierten MCUs."
    },
    solution: {
      en: "FOC with 14-bit absolute magnetic encoders and ADC sampling triggered at the PWM centre; a SYNC-frame distributed clock on CAN FD for 1 kHz setpoint streaming; collision detection comparing measured joint torque with a recursive Newton-Euler dynamics model, debounced and wired to a hardware Safe Torque Off (STO) path.",
      de: "FOC mit 14-Bit-Absolutwertgebern und ADC-Abtastung in der PWM-Mitte; SYNC-Frame-basierte verteilte Uhr auf CAN FD für 1 kHz Sollwert-Streaming; Kollisionserkennung durch Vergleich des gemessenen Gelenkmoments mit einem rekursiven Newton-Euler-Dynamikmodell, entprellt und auf einen hardwareseitigen Safe-Torque-Off-Pfad (STO) geführt."
    },
    architecture: [
      "Joint drives: 6x STM32G474 (Cortex-M4F @ 170 MHz), HRTIM PWM, 3-phase gate drivers with STO input",
      "Motion master: STM32H7 real-time controller + Jetson Orin running ROS 2 Humble, MoveIt 2, ros2_control",
      "Feedback: 14-bit absolute magnetic encoders (SPI), inline phase-current shunts, winding temperature",
      "Fieldbus: CAN FD @ 5 Mbps data phase, SYNC-based distributed clock, per-joint heartbeat supervision"
    ],
    hardwareSpecs: [
      { label: "Current Loop Rate", value: "20 kHz FOC per joint" },
      { label: "Setpoint Streaming", value: "1 kHz synchronised (CAN FD)" },
      { label: "Payload / Reach", value: "3 kg / 650 mm" },
      { label: "Repeatability", value: "± 0.08 mm" }
    ],
    protocols: ["CAN FD (ISO 11898-1)", "CiA 402 drive profile (concepts)", "SPI", "ros2_control", "DDS"],
    standards: ["ISO 10218-1", "ISO/TS 15066 (Cobots)", "IEC 61800-5-2 (STO)", "MISRA C:2012"],
    metrics: [
      { label: "Joint Sync Jitter", value: "< 5 µs across 6 axes" },
      { label: "Collision Stop Time", value: "< 12 ms detect-to-STO" },
      { label: "Position Tracking Error", value: "< 0.05° RMS" }
    ],
    codeSnippet: {
      language: "c",
      filename: "joint_foc_ctrl.c",
      code: `/* 20 kHz FOC loop: HRTIM triggers the ADC at PWM centre, ADC EOC runs the loop */
void ADC1_2_IRQHandler(void)
{
    const float theta_e = Encoder_ElecAngle(&enc);       /* 14-bit abs. encoder, SPI DMA */
    const abc_t i_abc   = Adc_PhaseCurrents(&adc_inj);   /* injected group, offset-trimmed */
    const dq_t  i_dq    = Park(Clarke(i_abc), theta_e);

    /* iq_ref comes from the 1 kHz position/velocity cascade fed by CAN FD SYNC */
    const dq_t v_dq = {
        .d = PI_Run(&pi_id, 0.0f,         i_dq.d),
        .q = PI_Run(&pi_iq, joint.iq_ref, i_dq.q)
    };
    Svpwm_Write(&hrtim, InvPark(v_dq, theta_e), Vbus_Get());

    /* Collision detection: measured vs. Newton-Euler model torque (model at 1 kHz) */
    const float tau_res = (KT_JOINT_NM_PER_A * i_dq.q) - joint.tau_model;
    if (fabsf(tau_res) > COLLISION_THRESH_NM) {
        if (collision_cnt < COLLISION_DEBOUNCE_TICKS) {
            collision_cnt++;
        } else {
            Safety_TriggerSTO(FAULT_COLLISION);   /* 4 ticks = 200 us, gate drivers off */
        }
    } else {
        collision_cnt = 0U;
    }
}`
    }
  },
  {
    id: "autonomous-mobile-robot",
    title: "Autonomous Mobile Robot with ROS 2 Nav2 & micro-ROS Motor Control",
    subtitle: {
      en: "micro-ROS client on STM32H7 with 1 kHz FreeRTOS wheel control, LiDAR SLAM, and EKF sensor fusion on an embedded Linux companion",
      de: "micro-ROS-Client auf STM32H7 mit 1 kHz FreeRTOS-Radregelung, LiDAR-SLAM und EKF-Sensorfusion auf einem Embedded-Linux-Companion"
    },
    category: "robotics",
    tags: ["ROS 2 Humble", "micro-ROS", "Nav2 / SLAM", "STM32H7", "FreeRTOS", "Sensor Fusion (EKF)", "LiDAR"],
    summary: {
      en: "Built an autonomous differential-drive robot that splits responsibilities cleanly: ROS 2 Nav2 path planning, SLAM Toolbox mapping, and robot_localization EKF on a Raspberry Pi 4, and hard real-time wheel control on an STM32H7 running a micro-ROS client over XRCE-DDS. Achieved < 3 cm indoor localisation error.",
      de: "Aufbau eines autonomen Differenzialantrieb-Roboters mit klarer Aufgabentrennung: ROS 2 Nav2-Pfadplanung, SLAM-Toolbox-Kartierung und robot_localization-EKF auf einem Raspberry Pi 4 sowie harte Echtzeit-Radregelung auf einem STM32H7 mit micro-ROS-Client über XRCE-DDS. Erreicht < 3 cm Indoor-Lokalisierungsfehler."
    },
    challenge: {
      en: "Guaranteeing a deterministic 1 kHz wheel-speed PID on the MCU while publishing odometry and IMU data to ROS 2 with low latency over a serial XRCE-DDS link, within the SRAM and flash budget of a Cortex-M7 — and stopping safely if the ROS 2 link drops.",
      de: "Deterministische 1 kHz Raddrehzahlregelung auf dem MCU bei gleichzeitig latenzarmer Übertragung von Odometrie- und IMU-Daten an ROS 2 über eine serielle XRCE-DDS-Verbindung — im SRAM- und Flash-Budget eines Cortex-M7 und mit sicherem Stopp bei Verbindungsabbruch."
    },
    solution: {
      en: "Rate-monotonic FreeRTOS design: a highest-priority 1 kHz PID task reading hardware quadrature timers, a lower-priority micro-ROS executor task for serialisation, and a length-1 mailbox queue between them so the latest command always wins. A cmd_vel watchdog forces zero velocity after 200 ms without commands.",
      de: "Rate-monotones FreeRTOS-Design: höchstpriorer 1 kHz PID-Task mit Hardware-Quadraturzählern, niedriger priorisierter micro-ROS-Executor-Task für die Serialisierung und eine Mailbox-Queue (Länge 1), damit stets der neueste Befehl gilt. Ein cmd_vel-Watchdog setzt die Geschwindigkeit nach 200 ms ohne Befehl auf null."
    },
    architecture: [
      "MCU: STM32H743 (Cortex-M7 @ 480 MHz), FreeRTOS + micro-ROS client (rclc)",
      "Companion: Raspberry Pi 4 with ROS 2 Humble, Nav2, SLAM Toolbox, robot_localization, micro-ROS Agent",
      "Sensors: RPLIDAR A1 2D LiDAR, ICM-42688-P 6-axis IMU (SPI), quadrature wheel encoders",
      "Transport: XRCE-DDS over UART with DMA @ 921600 baud"
    ],
    hardwareSpecs: [
      { label: "PID Loop Rate", value: "1 kHz (1 ms deterministic)" },
      { label: "Localisation Error", value: "< 3 cm indoor (EKF fused)" },
      { label: "Odometry Latency", value: "< 4.5 ms MCU → ROS 2" },
      { label: "Flash Footprint", value: "38 kB (micro-ROS + drivers + RTOS)" }
    ],
    protocols: ["XRCE-DDS", "UART / DMA", "SPI (IMU)", "USB (LiDAR)", "DDS (ROS 2)"],
    standards: ["ROS 2 REP-105 / REP-103", "MISRA C:2012", "IEC 61508 (concepts)"],
    metrics: [
      { label: "PID Loop Jitter", value: "< 8 µs @ 1 kHz" },
      { label: "Nav2 Goal Success", value: "96% over 200 runs" },
      { label: "Obstacle Stop Distance", value: "< 12 cm @ 0.5 m/s" }
    ],
    codeSnippet: {
      language: "c",
      filename: "micro_ros_motor_ctrl.c",
      code: `/* micro-ROS subscription callback: runs in the executor TASK, not in an ISR */
static void cmd_vel_callback(const void *msg_in)
{
    const geometry_msgs__msg__Twist *cmd = (const geometry_msgs__msg__Twist *)msg_in;
    const double half_track = TRACK_WIDTH_M * 0.5;

    /* Differential-drive inverse kinematics: (v, w) -> wheel speed [rad/s] */
    const WheelSetpoint_t sp = {
        .left  = (float)((cmd->linear.x - (cmd->angular.z * half_track)) / WHEEL_RADIUS_M),
        .right = (float)((cmd->linear.x + (cmd->angular.z * half_track)) / WHEEL_RADIUS_M)
    };
    (void)xQueueOverwrite(xSetpointMailbox, &sp);  /* length-1 queue: latest command wins */
    last_cmd_tick = xTaskGetTickCount();           /* feeds the cmd_vel watchdog */
}

/* 1 kHz wheel-speed PID: highest application priority (rate-monotonic) */
static void vMotorPidTask(void *arg)
{
    WheelSetpoint_t sp = { 0.0f, 0.0f };
    TickType_t last_wake = xTaskGetTickCount();
    (void)arg;

    for (;;) {
        vTaskDelayUntil(&last_wake, pdMS_TO_TICKS(1U));
        (void)xQueuePeek(xSetpointMailbox, &sp, 0U);

        if ((xTaskGetTickCount() - last_cmd_tick) > pdMS_TO_TICKS(CMD_TIMEOUT_MS)) {
            sp.left  = 0.0f;                       /* safe stop if the ROS 2 link drops */
            sp.right = 0.0f;
        }
        Motor_SetDuty(MOTOR_L, PID_Step(&pid_l, sp.left,  Encoder_Speed(&enc_l)));
        Motor_SetDuty(MOTOR_R, PID_Step(&pid_r, sp.right, Encoder_Speed(&enc_r)));
    }
}`
    }
  },
  {
    id: "riscv-soc-firmware",
    title: "RISC-V SoC Bring-Up: Bare-Metal & Zephyr RTOS Drivers",
    subtitle: {
      en: "RV32IMAC peripheral drivers without a vendor HAL: PLIC/CLINT interrupt handling, zero-copy DMA for SPI/UART, and a Zephyr board port",
      de: "RV32IMAC-Peripherietreiber ohne Hersteller-HAL: PLIC/CLINT-Interrupt-Handling, Zero-Copy-DMA für SPI/UART und ein Zephyr-Board-Port"
    },
    category: "embedded",
    tags: ["RISC-V", "Zephyr RTOS", "Bare-Metal C", "Device Tree / Kconfig", "DMA", "GDB / OpenOCD / JTAG"],
    summary: {
      en: "Brought up the peripheral driver stack of an open-source RISC-V SoC from register level: trap and interrupt handling via PLIC and CLINT, zero-copy DMA drivers for SPI and UART, and a Zephyr RTOS board port with Devicetree bindings, Kconfig options, and Ztest-based driver tests.",
      de: "Inbetriebnahme des Peripherietreiber-Stacks eines offenen RISC-V SoC auf Registerebene: Trap- und Interrupt-Handling über PLIC und CLINT, Zero-Copy-DMA-Treiber für SPI und UART sowie ein Zephyr-RTOS-Board-Port mit Devicetree-Bindings, Kconfig-Optionen und Ztest-basierten Treibertests."
    },
    challenge: {
      en: "No vendor HAL: every driver had to be written against the register map, including the assembly trap vector, while keeping DMA buffers coherent and interrupt latency deterministic.",
      de: "Kein Hersteller-HAL: Alle Treiber mussten direkt gegen die Registerbeschreibung entwickelt werden, inklusive Assembler-Trap-Vektor — bei kohärenten DMA-Puffern und deterministischer Interrupt-Latenz."
    },
    solution: {
      en: "Typed, volatile-correct register headers with explicit fence instructions around DMA hand-over; a PLIC dispatcher that drains all pending sources per trap; and an automated test suite run on FPGA via OpenOCD/JTAG in CI.",
      de: "Typisierte, volatile-korrekte Register-Header mit expliziten fence-Instruktionen bei der DMA-Übergabe; ein PLIC-Dispatcher, der alle anstehenden Quellen pro Trap abarbeitet; automatisierte Testsuite auf FPGA via OpenOCD/JTAG in der CI."
    },
    architecture: [
      "ISA: RV32IMAC (integer, multiply, atomic, compressed), machine mode",
      "Interrupts: RISC-V PLIC (external) + CLINT (timer / software)",
      "Toolchain: riscv32 GCC, OpenOCD, GDB, West (Zephyr)",
      "Target: FPGA prototype @ 100 MHz, then development silicon"
    ],
    hardwareSpecs: [
      { label: "Clock Frequency", value: "100 MHz" },
      { label: "Interrupt Latency", value: "18 cycles (180 ns)" },
      { label: "Flash Footprint", value: "24 kB (drivers + RTOS)" },
      { label: "SRAM Usage", value: "8.2 kB static" }
    ],
    protocols: ["SPI", "UART", "I2C", "JTAG (IEEE 1149.1)"],
    standards: ["RISC-V Privileged Spec v1.11", "MISRA C:2012"],
    metrics: [
      { label: "SPI DMA Throughput", value: "6.1 MB/s (98% of 50 MHz SCK)" },
      { label: "Interrupt Latency", value: "180 ns @ 100 MHz" },
      { label: "CPU Load During Transfer", value: "3% (DMA) vs 100% (polling)" }
    ],
    codeSnippet: {
      language: "c",
      filename: "plic_dispatch.c",
      code: `/* PLIC context 0 (hart 0, M-mode) claim/complete register */
#define PLIC_BASE        (0x0C000000UL)
#define PLIC_CLAIM_CTX0  (*(volatile uint32_t *)(PLIC_BASE + 0x200004UL))

typedef void (*irq_handler_t)(void);
static irq_handler_t irq_table[PLIC_NUM_SOURCES];

/* Machine external interrupt: claim -> dispatch -> complete.
 * Drains every pending source so a burst costs one trap entry, not N. */
void handle_m_ext_interrupt(void)
{
    uint32_t src = PLIC_CLAIM_CTX0;

    while (src != 0U) {
        if ((src < PLIC_NUM_SOURCES) && (irq_table[src] != NULL)) {
            irq_table[src]();
        }
        PLIC_CLAIM_CTX0 = src;          /* write-back signals completion */
        src = PLIC_CLAIM_CTX0;
    }
}

/* SPI RX DMA complete: hand the buffer to the driver without copying */
static void spi_dma_done_isr(void)
{
    DMA0->INT_CLR = DMA_INT_TC;
    __asm__ volatile ("fence iorw, iorw" ::: "memory");  /* DMA writes visible to CPU */
    spi_xfer_complete(&spi0_ctx);                        /* swap ping-pong buffers */
}`
    }
  },
  {
    id: "can-fd-gateway-ecu",
    title: "Automotive CAN FD Dual-Channel Gateway & Telemetry ECU",
    subtitle: {
      en: "Deterministic FreeRTOS routing between two CAN FD domains with hardware filtering, AUTOSAR E2E protection, and HIL validation in Vector CANoe",
      de: "Deterministisches FreeRTOS-Routing zwischen zwei CAN FD-Domänen mit Hardware-Filterung, AUTOSAR-E2E-Absicherung und HIL-Validierung in Vector CANoe"
    },
    category: "automotive",
    tags: ["CAN FD", "AUTOSAR E2E", "STM32H7", "FreeRTOS", "Vector CANoe / CAPL", "ISO 26262", "MISRA C:2012"],
    summary: {
      en: "Designed and implemented a gateway ECU bridging two galvanically isolated CAN FD domains at a 5 Mbps data phase. Routing is table-driven with hardware acceptance filtering; safety-relevant signals carry AUTOSAR E2E Profile 1 protection (CRC + alive counter). Validated with CAPL-scripted HIL tests in Vector CANoe.",
      de: "Entwicklung eines Gateway-Steuergeräts, das zwei galvanisch getrennte CAN FD-Domänen mit 5 Mbit/s Datenphase verbindet. Tabellengesteuertes Routing mit Hardware-Akzeptanzfilterung; sicherheitsrelevante Signale mit AUTOSAR-E2E-Profil 1 (CRC + Alive-Counter). Validierung mit CAPL-basierten HIL-Tests in Vector CANoe."
    },
    challenge: {
      en: "Avoiding queue starvation and latency jitter during bursts above 85% bus load while guaranteeing delivery deadlines for powertrain and chassis frames.",
      de: "Vermeidung von Queue-Starvation und Latenz-Jitter bei Lastspitzen über 85% Buslast unter Einhaltung der Zustellfristen für Antriebs- und Fahrwerksbotschaften."
    },
    solution: {
      en: "Non-matching IDs are rejected in the FDCAN hardware filters, so the CPU only sees routed traffic. The RX ISR drains the message-RAM FIFO into priority-separated FreeRTOS queues; a highest-priority routing task forwards frames using a static routing table, timestamping each frame with the DWT cycle counter for latency tracing.",
      de: "Nicht benötigte IDs werden bereits in den FDCAN-Hardwarefiltern verworfen, sodass die CPU nur zu routenden Verkehr sieht. Der RX-ISR leert den Message-RAM-FIFO in prioritätsgetrennte FreeRTOS-Queues; ein höchstpriorer Routing-Task leitet Frames über eine statische Routing-Tabelle weiter und versieht jeden Frame zur Latenzmessung mit einem DWT-Zeitstempel."
    },
    architecture: [
      "MCU: STM32H755 dual-core Cortex-M7 @ 480 MHz / Cortex-M4 @ 240 MHz, 2x FDCAN",
      "Transceivers: TI ISO1044 isolated CAN FD transceivers (5 Mbps)",
      "Software: FreeRTOS, AUTOSAR-style layering (MCAL / BSW / application), static routing table",
      "Safety: AUTOSAR E2E Profile 1, independent watchdog, bus-off recovery state machine"
    ],
    hardwareSpecs: [
      { label: "Bit Rate (Arbitration)", value: "500 kbps" },
      { label: "Bit Rate (Data Phase)", value: "5 Mbps" },
      { label: "Routing Latency", value: "< 220 µs end-to-end" },
      { label: "Isolation", value: "3 kV RMS per channel" }
    ],
    protocols: ["CAN FD (ISO 11898-1:2015)", "CAN 2.0B", "UDS (ISO 14229)", "SPI", "UART"],
    standards: ["ISO 26262 (ASIL-B aligned)", "AUTOSAR E2E", "MISRA C:2012"],
    metrics: [
      { label: "Routing Latency", value: "< 220 µs" },
      { label: "Frames Lost", value: "0 @ 92% bus load (24 h)" },
      { label: "Worst-Case CPU Load", value: "41% (M7 core)" }
    ],
    codeSnippet: {
      language: "c",
      filename: "cangw_rx.c",
      code: `/* Hardware filtering: accept powertrain IDs 0x100-0x1FF into RX FIFO0, reject the rest */
static void CanGw_ConfigFilters(FDCAN_HandleTypeDef *hcan)
{
    const FDCAN_FilterTypeDef flt = {
        .IdType       = FDCAN_STANDARD_ID,
        .FilterIndex  = 0U,
        .FilterType   = FDCAN_FILTER_RANGE,
        .FilterConfig = FDCAN_FILTER_TO_RXFIFO0,
        .FilterID1    = 0x100U,
        .FilterID2    = 0x1FFU
    };

    if ((HAL_FDCAN_ConfigFilter(hcan, &flt) != HAL_OK) ||
        (HAL_FDCAN_ConfigGlobalFilter(hcan, FDCAN_REJECT, FDCAN_REJECT,
                                      FDCAN_REJECT_REMOTE, FDCAN_REJECT_REMOTE) != HAL_OK)) {
        CanGw_EnterSafeState(CANGW_ERR_FILTER_CFG);
    }
}

/* RX FIFO0 ISR: copy header AND payload (up to 64 bytes) into the routing queue */
void HAL_FDCAN_RxFifo0Callback(FDCAN_HandleTypeDef *hcan, uint32_t RxFifo0ITs)
{
    BaseType_t woken = pdFALSE;
    CanGwFrame_t frame;

    if ((RxFifo0ITs & FDCAN_IT_RX_FIFO0_NEW_MESSAGE) != 0U) {
        while ((HAL_FDCAN_GetRxFifoFillLevel(hcan, FDCAN_RX_FIFO0) > 0U) &&
               (HAL_FDCAN_GetRxMessage(hcan, FDCAN_RX_FIFO0, &frame.hdr, frame.data) == HAL_OK)) {
            frame.rx_cycles = DWT->CYCCNT;               /* latency tracing */
            if (xQueueSendFromISR(xRouteQueue, &frame, &woken) != pdPASS) {
                CanGw_ReportOverrun();                   /* stored as DTC, read via UDS 0x19 */
            }
        }
    }
    portYIELD_FROM_ISR(woken);
}`
    }
  },
  {
    id: "automotive-cluster-hmi",
    title: "Automotive Instrument Cluster HMI with TouchGFX & Qt",
    subtitle: {
      en: "Digital cluster on STM32F7 (TouchGFX) and embedded Linux (Qt/QML) decoding live CAN signals at a steady 60 FPS",
      de: "Digitales Kombiinstrument auf STM32F7 (TouchGFX) und Embedded Linux (Qt/QML) mit Live-CAN-Signalen bei konstant 60 FPS"
    },
    category: "automotive",
    tags: ["TouchGFX", "Qt / QML", "STM32F7", "CAN Bus", "C++", "Embedded GUI"],
    summary: {
      en: "Designed and developed an instrument cluster UI in two variants — TouchGFX on STM32F769 and Qt/QML on embedded Linux — that decodes CAN signals in real time to drive speedometer, tachometer, state of charge, and ISO 2575 telltales at a steady 60 FPS.",
      de: "Design und Entwicklung einer Kombiinstrument-Oberfläche in zwei Varianten — TouchGFX auf STM32F769 und Qt/QML auf Embedded Linux —, die CAN-Signale in Echtzeit dekodiert und Tacho, Drehzahlmesser, Ladezustand sowie ISO-2575-Kontrollleuchten mit konstant 60 FPS darstellt."
    },
    challenge: {
      en: "Tear-free 60 FPS rendering on a microcontroller while continuously processing 100 Hz CAN telemetry, without the bus traffic ever stalling the render loop.",
      de: "Rissfreies 60-FPS-Rendering auf einem Mikrocontroller bei kontinuierlicher Verarbeitung von 100-Hz-CAN-Telemetrie, ohne dass der Busverkehr die Render-Schleife blockiert."
    },
    solution: {
      en: "Chrom-ART (DMA2D) hardware blitting and alpha blending with double-buffered framebuffers in external SDRAM, VSYNC-locked rendering, and a dedicated CAN decode task that hands signals to the GUI task through a non-blocking queue. Needles are low-pass filtered every frame for smooth motion.",
      de: "Chrom-ART-Hardware-Blitting (DMA2D) und Alpha-Blending mit doppelt gepufferten Framebuffern im externen SDRAM, VSYNC-synchronem Rendering und einem eigenen CAN-Dekodier-Task, der Signale über eine nicht blockierende Queue an den GUI-Task übergibt. Die Zeiger werden in jedem Frame tiefpassgefiltert."
    },
    architecture: [
      "Hardware: STM32F769I-DISCO (Cortex-M7 @ 216 MHz), 800x480 MIPI-DSI display",
      "Graphics: TouchGFX (C++) on MCU; Qt 6 / QML variant on embedded Linux",
      "Memory: 16 MB SDRAM (framebuffers), 64 MB QSPI flash (image assets)",
      "Input: high-speed CAN transceiver, DBC-based signal decoding"
    ],
    hardwareSpecs: [
      { label: "Display", value: "800 x 480, 24-bit RGB" },
      { label: "Frame Rate", value: "60 FPS stable" },
      { label: "CAN Signal Rate", value: "100 Hz" },
      { label: "Framebuffers", value: "2 x 1.15 MB in SDRAM" }
    ],
    protocols: ["CAN 2.0B", "MIPI-DSI", "FMC / SDRAM", "QSPI"],
    standards: ["ISO 15008 (in-vehicle displays)", "ISO 2575 (telltale symbols)"],
    metrics: [
      { label: "Rendering Rate", value: "60 FPS steady" },
      { label: "CAN-to-Pixel Latency", value: "< 20 ms worst case" },
      { label: "CPU Load", value: "28% during full needle sweep" }
    ],
    codeSnippet: {
      language: "cpp",
      filename: "Model.cpp",
      code: `// Model::tick() runs once per VSYNC (60 Hz) in the TouchGFX task.
// CAN frames are decoded in a separate RTOS task and handed over via a queue,
// so rendering never blocks on bus I/O.
void Model::tick()
{
    VehicleSignals update;

    // Drain everything that arrived since the last frame; keep only the latest values
    while (xQueueReceive(gCanSignalQueue, &update, 0) == pdPASS) {
        latest_.merge(update);
    }

    // Low-pass filter every frame so needles sweep smoothly despite 100 Hz input steps
    speedKph_ += kNeedleAlpha * (latest_.speedKph - speedKph_);
    rpm_      += kNeedleAlpha * (latest_.rpm      - rpm_);

    modelListener->onSpeedChanged(speedKph_);
    modelListener->onRpmChanged(rpm_);

    if (latest_.telltales != shownTelltales_) {       // redraw icons only on change
        shownTelltales_ = latest_.telltales;
        modelListener->onTelltalesChanged(shownTelltales_);   // ISO 2575 symbols
    }
}`
    }
  },
  {
    id: "uds-diagnostic-logger",
    title: "Automotive UDS Diagnostic Stack & Flash Bootloader",
    subtitle: {
      en: "ISO 14229 / ISO 15765-2 diagnostic server with secure flash reprogramming, DTC management, and a python-can test bench",
      de: "ISO 14229 / ISO 15765-2 Diagnoseserver mit gesicherter Flash-Programmierung, DTC-Verwaltung und python-can-Testumgebung"
    },
    category: "automotive",
    tags: ["UDS (ISO 14229)", "ISO-TP (ISO 15765-2)", "Bootloader", "CAN / CAN FD", "python-can / pytest", "Embedded C"],
    summary: {
      en: "Implemented a UDS diagnostic server on DoCAN with an in-field flash bootloader: session and security management, DTC storage and readout, and the full programming sequence (0x34/0x36/0x37) with CRC verification and a fail-safe dual-bank update. A pytest suite using python-can acts as the tester.",
      de: "Implementierung eines UDS-Diagnoseservers über DoCAN mit Flash-Bootloader: Session- und Security-Management, DTC-Speicherung und -Auslesung sowie die vollständige Programmiersequenz (0x34/0x36/0x37) mit CRC-Prüfung und ausfallsicherem Dual-Bank-Update. Eine pytest-Suite mit python-can übernimmt die Tester-Rolle."
    },
    challenge: {
      en: "Robust multi-frame ISO-TP transfers under frame loss and timing violations, and a seed-key security access that cannot be brute-forced — while guaranteeing the ECU never bricks if power fails mid-update.",
      de: "Robuste ISO-TP-Multi-Frame-Übertragung bei Frameverlust und Timing-Verletzungen sowie ein Seed-Key-Zugang, der nicht per Brute Force zu knacken ist — bei garantierter Wiederherstellbarkeit, falls die Versorgung mitten im Update ausfällt."
    },
    solution: {
      en: "An ISO-TP state machine with flow control (BS/STmin), sequence-number checking, and N_Bs / N_Cr timeout supervision; AES-128 based seed-key with attempt counter and lockout delay; A/B flash banks where the new image is only activated after CRC32 verification.",
      de: "ISO-TP-State-Machine mit Flow-Control (BS/STmin), Sequenznummernprüfung und N_Bs-/N_Cr-Timeout-Überwachung; AES-128-basierter Seed-Key mit Versuchszähler und Sperrzeit; A/B-Flash-Bänke, bei denen das neue Image erst nach CRC32-Prüfung aktiviert wird."
    },
    architecture: [
      "Services: 0x10, 0x11, 0x14, 0x19, 0x22, 0x27, 0x2E, 0x31, 0x34, 0x36, 0x37, 0x3E, 0x85",
      "Transport: ISO 15765-2 (ISO-TP), normal addressing, classic CAN and CAN FD",
      "Storage: DTCs in EEPROM emulation with wear levelling; frame logs to microSD (SDIO + DMA)",
      "Tester: Python (python-can, pytest) via USB-CAN adapter, cross-checked in Vector CANoe"
    ],
    hardwareSpecs: [
      { label: "Log Throughput", value: "Up to 10,000 frames/s" },
      { label: "ISO-TP Flow Control", value: "BS 0–255 frames, STmin 0–127 ms" },
      { label: "DTC Storage", value: "EEPROM emulation, wear-levelled" },
      { label: "Security Access", value: "AES-128 seed-key + lockout" }
    ],
    protocols: ["UDS (ISO 14229-1)", "ISO-TP (ISO 15765-2)", "CAN / CAN FD", "SDIO", "USB CDC"],
    standards: ["ISO 14229-1", "ISO 15765-2", "MISRA C:2012"],
    metrics: [
      { label: "Flash Reprogram Time", value: "45 s for 512 kB (CAN 500 kbps)" },
      { label: "Data Loss", value: "0 frames over 24 h endurance" },
      { label: "Response Time", value: "< 1.5 ms (P2 budget 50 ms)" }
    ],
    codeSnippet: {
      language: "c",
      filename: "isotp_rx.c",
      code: `/* ISO 15765-2 receive path (classic CAN): SF / FF -> Flow Control -> CFs */
void IsoTp_OnRxFrame(IsoTpLink_t *l, const uint8_t *d, uint8_t dlc)
{
    switch (d[0] >> 4) {
    case PCI_SF: {                                            /* single frame */
        const uint8_t sf_dl = d[0] & 0x0FU;
        if ((sf_dl > 0U) && (sf_dl < dlc)) {
            IsoTp_Deliver(l, &d[1], sf_dl);
        }
        break;
    }
    case PCI_FF: {                                            /* first frame */
        l->rx_len = (uint16_t)(((uint16_t)(d[0] & 0x0FU) << 8) | d[1]);
        if (l->rx_len > ISOTP_BUF_SIZE) {
            IsoTp_SendFC(l, FC_OVERFLOW, 0U, 0U);
            l->state = ISOTP_IDLE;
        } else {
            (void)memcpy(l->buf, &d[2], 6U);
            l->rx_idx = 6U;  l->sn = 1U;  l->bs_cnt = 0U;
            IsoTp_SendFC(l, FC_CTS, ISOTP_BS, ISOTP_STMIN_MS);
            Timer_Start(&l->n_cr, N_CR_TIMEOUT_MS);
            l->state = ISOTP_RX_CF;
        }
        break;
    }
    case PCI_CF: {                                            /* consecutive frame */
        if ((l->state != ISOTP_RX_CF) || ((d[0] & 0x0FU) != l->sn)) {
            IsoTp_Abort(l, N_WRONG_SN);
            break;
        }
        const uint16_t n = MIN(7U, (uint16_t)(l->rx_len - l->rx_idx));
        (void)memcpy(&l->buf[l->rx_idx], &d[1], n);
        l->rx_idx += n;
        l->sn = (uint8_t)((l->sn + 1U) & 0x0FU);

        if (l->rx_idx >= l->rx_len) {
            Timer_Stop(&l->n_cr);
            l->state = ISOTP_IDLE;
            IsoTp_Deliver(l, l->buf, l->rx_len);              /* -> UDS dispatcher */
        } else {
            if ((ISOTP_BS != 0U) && (++l->bs_cnt == ISOTP_BS)) {
                l->bs_cnt = 0U;
                IsoTp_SendFC(l, FC_CTS, ISOTP_BS, ISOTP_STMIN_MS);   /* next block */
            }
            Timer_Start(&l->n_cr, N_CR_TIMEOUT_MS);
        }
        break;
    }
    default:                                                  /* FC handled on TX side */
        break;
    }
}`
    }
  },
  {
    id: "bms-active-balancing",
    title: "Modular EV Battery Management System with Active Cell Balancing",
    subtitle: {
      en: "16S slave modules daisy-chained over isoSPI into a 96S / 400 V pack, with EKF state-of-charge estimation and contactor safety logic",
      de: "16S-Slave-Module, per isoSPI zu einem 96S-/400-V-Pack verkettet, mit EKF-Ladezustandsschätzung und Schütz-Sicherheitslogik"
    },
    category: "power_electronics",
    tags: ["BMS", "isoSPI Daisy-Chain", "SOC Estimation (EKF)", "Active Balancing", "Embedded C", "Functional Safety"],
    summary: {
      en: "Developed firmware and low-level drivers for a modular BMS: six 16-cell slave boards on an isoSPI daisy chain report to a master ECU that runs EKF-based SOC estimation, active flyback balancing, and a contactor safety state machine with an independent 1 ms protection task.",
      de: "Entwicklung von Firmware und Low-Level-Treibern für ein modulares BMS: Sechs 16-Zellen-Slave-Boards an einer isoSPI-Daisy-Chain melden an ein Master-Steuergerät, das EKF-basierte SOC-Schätzung, aktives Flyback-Balancing und eine Schütz-Sicherheits-State-Machine mit unabhängigem 1-ms-Schutztask ausführt."
    },
    challenge: {
      en: "Opening the contactors within 10 ms on over-current, over-/under-voltage, or over-temperature, while reading 96 cells reliably next to a switching traction inverter.",
      de: "Öffnen der Schütze innerhalb von 10 ms bei Überstrom, Über-/Unterspannung oder Übertemperatur — bei zuverlässiger Erfassung von 96 Zellen neben einem schaltenden Traktionswechselrichter."
    },
    solution: {
      en: "Transformer-isolated isoSPI with PEC15 checks on every register read; communication faults count as cell faults (fail-safe). Protection runs in its own highest-priority task independent of SOC and balancing logic, with debounced thresholds and a hardware watchdog on the contactor drivers.",
      de: "Transformatorisoliertes isoSPI mit PEC15-Prüfung bei jedem Registerzugriff; Kommunikationsfehler gelten als Zellfehler (fail-safe). Die Schutzfunktion läuft in einem eigenen höchstprioren Task unabhängig von SOC- und Balancing-Logik, mit entprellten Schwellwerten und Hardware-Watchdog für die Schützansteuerung."
    },
    architecture: [
      "AFE: ADBMS6830 16-cell monitor per module, isoSPI daisy chain (6 modules = 96S)",
      "Balancing: LTC3300-1 bidirectional flyback balancers, module-to-cell charge transfer",
      "Master: automotive-grade Cortex-M4F, isolated 16-bit shunt current sensing, NTC array",
      "Vehicle interface: CAN 2.0B to the VCU / inverter, contactor and pre-charge control"
    ],
    hardwareSpecs: [
      { label: "Cell Voltage Accuracy", value: "± 1.5 mV" },
      { label: "Pack Current Range", value: "± 250 A continuous" },
      { label: "Fault Reaction", value: "< 8.5 ms to contactor open" },
      { label: "Balancing Current", value: "2 A active (flyback)" }
    ],
    protocols: ["isoSPI (daisy chain)", "SPI", "CAN 2.0B", "I2C (EEPROM)"],
    standards: ["ISO 26262 (ASIL-C concept)", "UN ECE R100", "MISRA C:2012"],
    metrics: [
      { label: "Cell Sampling Jitter", value: "< 50 µs" },
      { label: "SOC Error over 10 h", value: "< 1.8%" },
      { label: "Fault-to-Contactor Open", value: "< 8.5 ms" }
    ],
    codeSnippet: {
      language: "c",
      filename: "bms_protect.c",
      code: `/* ADI isoSPI PEC15: polynomial 0x4599, seed 0x0010, result left-shifted by 1 */
static uint16_t Pec15_Calc(const uint8_t *data, uint8_t len)
{
    uint16_t rem = 0x0010U;

    for (uint8_t i = 0U; i < len; i++) {
        rem ^= (uint16_t)((uint16_t)data[i] << 7);
        for (uint8_t bit = 0U; bit < 8U; bit++) {
            rem = ((rem & 0x4000U) != 0U) ? (uint16_t)((rem << 1) ^ 0x4599U)
                                          : (uint16_t)(rem << 1);
            rem &= 0x7FFFU;
        }
    }
    return (uint16_t)(rem << 1);
}

/* 1 ms protection task: independent of SOC / balancing, highest priority */
void Bms_ProtectionStep(const BmsPack_t *pack)
{
    for (uint8_t c = 0U; c < BMS_NUM_CELLS; c++) {
        const uint16_t mv = pack->cell_mv[c];
        const bool comm_ok = pack->pec_ok[c / CELLS_PER_AFE];   /* lost data = fault */
        const bool fault = (!comm_ok) || (mv > CELL_OV_MV) || (mv < CELL_UV_MV);

        if (!fault) {
            fault_cnt[c] = 0U;
        } else if (fault_cnt[c] < FAULT_DEBOUNCE_MS) {
            fault_cnt[c]++;
        } else {
            Contactors_OpenAll(BMS_FAULT_CELL_VOLTAGE);         /* latched until service */
        }
    }
}`
    }
  },
  {
    id: "bidirectional-acdc-converter",
    title: "Bi-Directional AC-DC Converter Control Firmware (TI C2000)",
    subtitle: {
      en: "50 kHz dq-frame current control, SRF-PLL grid synchronisation, and dead-time compensation for a three-phase SiC converter",
      de: "50 kHz dq-Stromregelung, SRF-PLL-Netzsynchronisation und Totzeitkompensation für einen dreiphasigen SiC-Wandler"
    },
    category: "power_electronics",
    tags: ["TI C2000", "Power Electronics", "dq Control / SVPWM", "PLL", "Control Theory", "Oscilloscope Validation"],
    summary: {
      en: "Engineered the real-time control firmware for a three-phase bidirectional AC-DC converter at Hochschule Wismar: SRF-PLL grid synchronisation, Clarke/Park transformations, decoupled dq current loops, an outer DC-link voltage loop, and dead-time compensated SVPWM on a TMS320F28379D.",
      de: "Entwicklung der Echtzeit-Regelungsfirmware für einen dreiphasigen bidirektionalen AC/DC-Wandler an der Hochschule Wismar: SRF-PLL-Netzsynchronisation, Clarke/Park-Transformation, entkoppelte dq-Stromregler, überlagerte Zwischenkreisspannungsregelung und totzeitkompensierte SVPWM auf einem TMS320F28379D."
    },
    challenge: {
      en: "Running PLL, current loops, and the DC-link voltage loop inside a 20 µs PWM period without instability, shoot-through, or excessive current distortion.",
      de: "Ausführung von PLL, Stromregelung und Zwischenkreisregelung innerhalb einer 20 µs PWM-Periode ohne Instabilität, Brückenkurzschluss oder übermäßige Stromverzerrung."
    },
    solution: {
      en: "ADC conversions triggered at the PWM carrier midpoint to avoid switching noise, a multi-rate scheme (voltage loop at 1/10 of the current loop rate), feed-forward and cross-coupling decoupling in the dq frame, and timing verified with GPIO toggles on a 4-channel oscilloscope.",
      de: "ADC-Wandlung in der Mitte des PWM-Trägers zur Vermeidung von Schaltstörungen, Multi-Rate-Ansatz (Spannungsregler mit 1/10 der Stromregler-Rate), Vorsteuerung und Entkopplung im dq-System sowie Timing-Verifikation per GPIO-Toggle am 4-Kanal-Oszilloskop."
    },
    architecture: [
      "Controller: TI TMS320F28379D (C28x @ 200 MHz, FPU + TMU), ePWM, 16-bit ADCs",
      "Power stage: three-phase SiC MOSFET bridge, LCL grid filter",
      "Control: SRF-PLL, dq PI current loops with decoupling, outer DC-link voltage loop",
      "Sensing: Hall-effect current transducers, isolated differential voltage measurement"
    ],
    hardwareSpecs: [
      { label: "Switching Frequency", value: "50 kHz" },
      { label: "Sampling", value: "Synchronous, PWM-centre triggered" },
      { label: "Peak Efficiency", value: "97.4%" },
      { label: "Current THD", value: "< 3.1% at rated power" }
    ],
    protocols: ["ePWM (complementary, dead-time)", "CAN", "Modbus RTU", "SPI"],
    standards: ["IEC 61000-3-2", "IEEE 1547"],
    metrics: [
      { label: "Control ISR Time", value: "11.2 µs of 20 µs budget" },
      { label: "Peak Efficiency", value: "97.4%" },
      { label: "Current THD", value: "< 3.1%" }
    ],
    codeSnippet: {
      language: "c",
      filename: "acdc_ctrl_isr.c",
      code: `/* 50 kHz control ISR: ADC SOC is triggered by ePWM at the carrier midpoint */
__interrupt void adcA1_isr(void)
{
    const float vdc = Adc_DcLinkVoltage();

    /* 1. SRF-PLL: drive grid vq to zero to lock theta onto the grid angle */
    const dq_t v_grid = Park(Clarke(Adc_GridVoltages()), pll.theta);
    pll.omega = OMEGA_NOMINAL + PI_Run(&pll.pi, v_grid.q, 0.0f);
    pll.theta = WrapAngle2Pi(pll.theta + (pll.omega * TS_S));

    /* 2. Outer DC-link voltage loop at 1/10 rate -> active current reference */
    if (++vdc_div >= VDC_LOOP_DIV) {
        vdc_div = 0U;
        id_ref  = PI_Run(&pi_vdc, VDC_REF_V, vdc);
    }

    /* 3. Inner dq current loops with grid feed-forward and cross-coupling decoupling */
    const dq_t i_dq = Park(Clarke(Adc_PhaseCurrents()), pll.theta);
    const dq_t v_cmd = {
        .d = PI_Run(&pi_id, id_ref, i_dq.d) + v_grid.d - (OMEGA_L * i_dq.q),
        .q = PI_Run(&pi_iq, iq_ref, i_dq.q) + v_grid.q + (OMEGA_L * i_dq.d)
    };

    /* 4. Dead-time compensated SVPWM, then acknowledge the interrupt */
    Svpwm_Update(InvPark(v_cmd, pll.theta), vdc, &dt_comp);
    ADC_clearInterruptStatus(ADCA_BASE, ADC_INT_NUMBER1);
    Interrupt_clearACKGroup(INTERRUPT_ACK_GROUP1);
}`
    }
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    role: {
      en: "Master's Candidate & Academic Researcher",
      de: "Master-Kandidat & Wissenschaftlicher Forscher"
    },
    organization: "Hochschule Wismar – Faculty of Engineering",
    location: "Wismar, Germany",
    period: {
      en: "Sep 2024 – Present",
      de: "Sep 2024 – Heute"
    },
    type: "academic",
    description: {
      en: "Pursuing M.Sc. Information and Electrical Engineering (Grade: 1.7) with research focus on autonomous robotics firmware, ROS 2 navigation stacks, hydrogen fuel-cell embedded controls, and defence-grade ruggedized systems — domains at the forefront of Germany's industrial demand.",
      de: "M.Sc. Informations- und Elektrotechnik (Note: 1,7) mit Forschungsschwerpunkten auf autonomer Robotik-Firmware, ROS 2 Navigations-Stacks, Wasserstoff-Brennstoffzellen-Steuerungen und verteidigungstauglichen robusten Systemen — Schlüsseltechnologien der deutschen Industrienachfrage."
    },
    highlights: {
      en: [
        "Developed ROS 2 Humble navigation stacks (Nav2, SLAM Toolbox, robot_localization) on Zephyr RTOS-based embedded targets for autonomous mobile robot prototypes in defence reconnaissance scenarios.",
        "Engineered real-time hydrogen fuel-cell monitoring firmware on STM32H7, implementing CAN FD telemetry for stack voltage, membrane humidity, and thermal runaway detection — aligned with Germany's National Hydrogen Strategy.",
        "Designed safety-critical sensor fusion pipelines (LiDAR + IMU + wheel odometry) using micro-ROS on ARM Cortex-M7, achieving < 2 cm localization accuracy for indoor warehouse autonomy demonstrators.",
        "Researched bi-directional AC-DC digital control algorithms on TI C2000 DSPs, validating PWM switching behavior at 50 kHz for green energy power conversion applications.",
        "Built embedded cluster display HMI prototypes using TouchGFX and Qt Creator, connected to live CAN telemetry feeds for defence vehicle dashboard demonstrators.",
        "Authored academic papers on deterministic real-time task scheduling in safety-critical microcontrollers and presented at faculty research symposiums.",
        "Explored Zephyr RTOS device-tree overlays and Kconfig-based board support packages for custom RISC-V SoCs targeting European defence robotics platforms."
      ],
      de: [
        "Entwicklung von ROS 2 Humble Navigations-Stacks (Nav2, SLAM Toolbox, robot_localization) auf Zephyr RTOS-basierten Embedded-Targets für autonome mobile Roboter-Prototypen in Verteidigungsaufklärungsszenarien.",
        "Konzeption von Echtzeit-Firmware zur Überwachung von Wasserstoff-Brennstoffzellen auf STM32H7 mit CAN FD Telemetrie für Stapelspannung, Membranfeuchtigkeit und thermische Durchgehschutz-Erkennung — abgestimmt auf die Nationale Wasserstoffstrategie Deutschlands.",
        "Design sicherheitskritischer Sensorfusions-Pipelines (LiDAR + IMU + Radodometrie) mittels micro-ROS auf ARM Cortex-M7, mit < 2 cm Lokalisierungsgenauigkeit für Indoor-Lagerautonomie-Demonstratoren.",
        "Forschung an bidirektionalen AC/DC-Regelalgorithmen auf TI C2000 DSPs mit 50-kHz-PWM-Schaltfrequenzvalidierung für Anwendungen der grünen Energieumwandlung.",
        "Entwicklung von Kombiinstrument-HMI-Prototypen mit TouchGFX und Qt Creator, angebunden an Live-CAN-Telemetrie für Verteidigungsfahrzeug-Dashboard-Demonstratoren.",
        "Erstellung wissenschaftlicher Arbeiten zur deterministischen Echtzeit-Task-Planung in sicherheitskritischen Mikrocontrollern und Präsentation auf Forschungssymposien.",
        "Evaluierung von Zephyr RTOS Device-Tree-Overlays und Kconfig-basierten Board-Support-Paketen für kundenspezifische RISC-V SoCs in europäischen Verteidigungsrobotik-Plattformen."
      ]
    },
    techStack: ["ROS 2 Humble", "Nav2 / SLAM", "micro-ROS", "Zephyr RTOS", "STM32H7", "TI C2000 DSP", "TouchGFX", "Qt Creator", "MATLAB / Simulink", "LiDAR / IMU Fusion", "CAN FD", "Hydrogen Fuel-Cell Systems"],
    standards: ["ISO 26262", "DIN EN 62282 (Fuel Cells)", "NATO STANAG (Defence)", "Hochschule Wismar Academic Standards"]
  },
  {
    id: "exp-2",
    role: {
      en: "Embedded Systems & Firmware Engineer",
      de: "Ingenieur für Embedded Systems & Firmware"
    },
    organization: "Pentagon Rugged Systems",
    location: "Hyderabad, India",
    period: {
      en: "Mar 2023 – Sep 2024",
      de: "Mär 2023 – Sep 2024"
    },
    type: "industry",
    description: {
      en: "Developed safety-critical firmware and low-level drivers for ARM Cortex-M and RISC-V controllers in ruggedized heavy-vehicle and defence electronics. The work ran from board bring-up and RTOS architecture through to automated testing and CAN-FD validation.",
      de: "Entwicklung sicherheitskritischer Firmware und hardwarenaher Treiber für ARM Cortex-M und RISC-V Controller in robusten Schwerlastfahrzeug- und Verteidigungselektronikprodukten. Die Arbeit umfasste Board Bring-up, RTOS-Architektur, automatisierte Tests und CAN-FD-Validierung."
    },
    highlights: {
      en: [
        "Developed MISRA C:2012-compliant peripheral drivers (CAN FD, SPI, I2C, UART, DMA) for STM32 (Cortex-M) and RISC-V, with clean hardware abstraction between the driver and application layers.",
        "Designed preemptive FreeRTOS and Zephyr task architectures, including priority assignment, ISR-to-task deferral and inter-task queues and semaphores, achieving sub-millisecond deterministic response for vehicle telemetry.",
        "Implemented ISO 26262-aligned safety mechanisms: software watchdog supervision, MPU region configuration to isolate tasks, and startup and runtime hardware diagnostic routines.",
        "Led board bring-up of new PCBs starting from the schematics, diagnosing clock instability and power-rail transients with oscilloscopes and logic analyzers, and debugging on target via JTAG/SWD and GDB.",
        "Built a test-driven workflow with GTest unit tests in CI pipelines (Git, CMake), followed by on-target CAN-FD validation in Vector CANoe and regression testing for every firmware release.",
        "Worked in Agile sprints (JIRA) with the hardware and test teams, maintaining requirement traceability and technical documentation."
      ],
      de: [
        "Entwicklung MISRA C:2012-konformer Peripherietreiber (CAN FD, SPI, I2C, UART, DMA) für STM32 (Cortex-M) und RISC-V mit sauberer Hardware-Abstraktion zwischen Treiber- und Anwendungsschicht.",
        "Entwurf präemptiver FreeRTOS- und Zephyr-Task-Architekturen mit Prioritätsvergabe, ISR-to-Task-Deferral sowie inter-Task-Queues und Semaphoren für sub-Millisekunden-deterministische Reaktionszeiten bei Fahrzeugtelemetrie.",
        "Implementierung ISO 26262-konformer Sicherheitsmechanismen: Software-Watchdog-Überwachung, MPU-Regionenkonfiguration zur Task-Isolation sowie Start- und Laufzeit-Hardwarediagnoseroutinen.",
        "Leitung des Board Bring-ups neuer PCBs ausgehend von Schaltplänen, Diagnose von Taktinstabilitäten und Spannungstransienten mittels Oszilloskopen und Logikanalysatoren sowie On-Target-Debugging via JTAG/SWD und GDB.",
        "Aufbau eines testgetriebenen Workflows mit GTest-Unit-Tests in CI-Pipelines (Git, CMake), gefolgt von On-Target CAN-FD-Validierung in Vector CANoe und Regressionstests für jedes Firmware-Release.",
        "Arbeit in agilen Sprints (JIRA) mit Hardware- und Testteams, einschließlich Anforderungstraceability und technischer Dokumentation."
      ]
    },
    techStack: ["C", "C++", "FreeRTOS", "Zephyr RTOS", "STM32 (ARM Cortex-M)", "RISC-V", "CAN FD", "SPI", "I2C", "UART", "DMA", "JTAG / SWD", "GDB", "Vector CANoe", "GTest", "CMake", "Git"],
    standards: ["ISO 26262 (ASIL-B)", "MISRA C:2012", "ISO 11898-1"]
  },
  {
    id: "exp-3",
    role: {
      en: "Automotive Validation & ECU Test Intern (Werkstudent)",
      de: "Werkstudent – Automotive-Validierung & ECU-Test"
    },
    organization: "E/E Architecture & Verification Group",
    location: "Germany",
    period: {
      en: "Jan 2025 – Aug 2025",
      de: "Jan 2025 – Aug 2025"
    },
    type: "internship",
    description: {
      en: "Supported automotive communication validation, ECU integration testing, bus load simulation, and diagnostic compliance using industry-standard tools across multiple vehicle platform programs as a working student alongside Master's studies.",
      de: "Unterstützung der automobilen Kommunikationsvalidierung, ECU-Integrationstests, Buslastsimulationen und Diagnosekonformität mit branchenüblichen Tools über mehrere Fahrzeugplattform-Programme als Werkstudent neben dem Masterstudium."
    },
    highlights: {
      en: [
        "Executed extensive CAN / CAN FD network validation using Vector CANoe, PCAN-Explorer, and custom Python automation scripts.",
        "Automated UDS (ISO 14229) diagnostic protocol test cases verifying fault code generation (DTC), security access algorithms, and bootloader flash integrity.",
        "Conducted Hardware-in-the-Loop (HIL) fault injection testing to simulate bus errors, short circuits, and packet drops under extreme operating conditions.",
        "Generated comprehensive validation reports and trace analysis logs to streamline issue resolution across cross-functional engineering teams."
      ],
      de: [
        "Durchführung umfassender CAN / CAN FD Netzwerkvalidierungen mit Vector CANoe, PCAN-Explorer und Python-Testskripten.",
        "Automatisierung von UDS (ISO 14229) Diagnosetests zur Prüfung von Fehlercodes (DTC), Security Access und Bootloader-Flash-Integrität.",
        "HIL-Fehlerinjektionstests (Hardware-in-the-Loop) zur Simulation von Busfehlern, Kurzschlüssen und Paketverlusten.",
        "Erstellung detaillierter Validierungsberichte und Trace-Analysen zur Beschleunigung interdisziplinärer Fehlerbehebungen."
      ]
    },
    techStack: ["Vector CANoe", "PCAN-USB", "UDS (ISO 14229)", "Python", "Logic Analyzers", "HIL Testing", "Bus Load Analysis"],
    standards: ["ISO 11898-1", "ISO 14229", "ISO 15765-2"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "programming-firmware",
    title: {
      en: "Programming & Firmware",
      de: "Programmierung & Firmware"
    },
    iconName: "Code2",
    skills: [
      {
        name: "Embedded C / Modern C++",
        level: 95,
        note: {
          en: "Extensive driver & firmware development, pointers, bitwise ops, memory barriers, MISRA-C compliance",
          de: "Umfassende Treiber- & Firmware-Entwicklung, Zeiger, Bit-Operationen, Memory-Barriers, MISRA-C"
        },
        tags: ["C99/C11", "C++17", "MISRA-C:2012", "Bare-Metal"]
      },
      {
        name: "Real-Time Operating Systems (RTOS)",
        level: 88,
        note: {
          en: "FreeRTOS and Zephyr RTOS: mutexes, semaphores, message queues, preemptive scheduling, low jitter",
          de: "FreeRTOS und Zephyr RTOS: Mutexe, Semaphore, Nachrichten-Queues, präemptives Scheduling"
        },
        tags: ["FreeRTOS", "Zephyr RTOS", "Deterministic Scheduling", "Task Synchronization"]
      },
      {
        name: "RISC-V & ARM Architecture",
        level: 90,
        note: {
          en: "ARM Cortex-M (M0+, M4, M7), STM32 family, RISC-V (RV32I) assembly & peripheral registers",
          de: "ARM Cortex-M (M0+, M4, M7), STM32-Familie, RISC-V (RV32I) Assembler & Registerprogrammierung"
        },
        tags: ["STM32H7/F7/F4", "RISC-V RV32", "Memory-Mapped I/O", "NVIC / PLIC"]
      },
      {
        name: "Python for Automation & Test",
        level: 85,
        note: {
          en: "Automated HIL test suites, CAN log parsing, Pytest, serial telemetry GUI scripting",
          de: "Automatisierte HIL-Testsuiten, CAN-Log-Parsing, Pytest, serielle Telemetrie-Skripte"
        },
        tags: ["Python 3", "python-can", "Pytest", "Matplotlib"]
      }
    ]
  },
  {
    id: "automotive-protocols",
    title: {
      en: "Automotive Protocols & E/E",
      de: "Automotive-Protokolle & E/E"
    },
    iconName: "Car",
    skills: [
      {
        name: "CAN & CAN FD Communication",
        level: 92,
        note: {
          en: "Bit timing calculation, arbitration vs data phase, ISO 11898-1, bus load optimization, transceiver routing",
          de: "Bit-Timing-Berechnung, Arbitrierungs- vs. Datenphase, ISO 11898-1, Buslast-Optimierung"
        },
        tags: ["CAN 2.0B", "CAN FD (up to 5 Mbps)", "Vector CANoe", "PCAN"]
      },
      {
        name: "UDS & OBD-II Diagnostics (ISO 14229)",
        level: 86,
        note: {
          en: "ISO 14229 diagnostics, ISO 15765-2 ISO-TP segmentation, DTC fault management, Seed-Key unlock",
          de: "ISO 14229 Diagnosedienste, ISO 15765-2 ISO-TP, DTC-Fehlermanagement, Seed-Key-Verfahren"
        },
        tags: ["ISO 14229 (UDS)", "ISO 15765-2", "DTC Management", "Bootloader"]
      },
      {
        name: "Hardware Bus Protocols",
        level: 92,
        note: {
          en: "SPI (daisy chain, DMA transfers), I2C (clock stretching, multi-master), UART/RS485, PWM",
          de: "SPI (Daisy-Chain, DMA-Transfer), I2C (Clock Stretching), UART/RS485, PWM"
        },
        tags: ["SPI", "I2C", "UART / RS-485", "PWM / Timers"]
      },
      {
        name: "Functional Safety (ISO 26262)",
        level: 85,
        note: {
          en: "ASIL decomposition, safety goals, failure mode effects (FMEA/FMEDA), fault injection validation",
          de: "ASIL-Dekomposition, Sicherheitsziele, Fehlermöglichkeitsanalyse (FMEA/FMEDA), Fehlerinjektion"
        },
        tags: ["ISO 26262 ASIL-B/C", "Fault Injection", "FMEA / FMEDA", "Watchdog Timers"]
      }
    ]
  },
  {
    id: "hardware-validation",
    title: {
      en: "Hardware, Validation & Lab Tools",
      de: "Hardware, Validierung & Labortools"
    },
    iconName: "Cpu",
    skills: [
      {
        name: "Board Bring-Up & Debugging",
        level: 90,
        note: {
          en: "Oscilloscopes (4-ch DSO), Logic Analyzers, JTAG / SWD, GDB, power rail transient analysis",
          de: "Oszilloskope (4-Kanal), Logikanalysatoren, JTAG / SWD, GDB, Spannungsversorgungsanalyse"
        },
        tags: ["JTAG / SWD", "GDB", "Oscilloscopes", "Logic Analyzers"]
      },
      {
        name: "PCB Design & Schematic Capture",
        level: 82,
        note: {
          en: "Schematic design, layout guidelines for high-speed signals, impedance matching, EMC/EMI reduction",
          de: "Schaltplanerstellung, Hochgeschwindigkeits-Layout, Impedanzanpassung, EMV-Gerechtes Design"
        },
        tags: ["Altium Designer", "KiCad", "EMC / EMI", "BOM Optimization"]
      },
      {
        name: "Embedded GUI & HMI Design",
        level: 84,
        note: {
          en: "TouchGFX (C++ framework) & Qt Creator (C++/QML) for digital instrument clusters and vehicle displays",
          de: "TouchGFX (C++) & Qt Creator (C++/QML) für digitale Kombiinstrumente und Fahrzeugdisplays"
        },
        tags: ["TouchGFX", "Qt Creator / QML", "DMA2D Chrom-ART", "Low-Latency UI"]
      },
      {
        name: "Digital Power & Motor Control",
        level: 83,
        note: {
          en: "AC-DC converters, TI C2000 DSP, Clarke/Park transforms, Space Vector PWM, closed-loop PI",
          de: "AC/DC-Wandler, TI C2000 DSP, Clarke/Park-Transformation, Raumzeiger-PWM, geschlossene PI-Regelung"
        },
        tags: ["TI C2000", "SVPWM", "PI Control", "Inverters / Converters"]
      }
    ]
  }
];

export const AWARDS: AwardItem[] = [
  {
    id: "award-1",
    title: {
      en: "Best Business and Cost Award",
      de: "Best Business and Cost Award"
    },
    event: "SIEP Hero Electric Vehicle Championship",
    organizer: "ISIE India",
    year: "National Recognition",
    description: {
      en: "Secured runner-up position for exceptional engineering design, cost optimization, and embedded electronic architecture in an electric prototype vehicle.",
      de: "Zweiter Platz (Runner-Up) für herausragendes Ingenieursdesign, Kostenoptimierung und embedded elektronische Architektur eines Elektrofahrzeug-Prototyps."
    },
    badge: "Runner-Up in Category"
  },
  {
    id: "award-2",
    title: {
      en: "Overall 3rd Runner-Up",
      de: "Gesamt 3. Platz (3rd Runner-Up)"
    },
    event: "National EV Innovation Event",
    organizer: "Punjab, India",
    year: "National EV Challenge",
    description: {
      en: "Recognized among 40+ engineering institutions nationwide for innovation in electric vehicle architecture and embedded platform reliability during dynamic endurance testing.",
      de: "Ausgezeichnet unter 40+ Ingenieurhochschulen für Innovationen in der Fahrzeugarchitektur und Systemzuverlässigkeit im 4-stündigen Renntest."
    },
    badge: "National Podium"
  }
];

export const ARTICLES: ArticleItem[] = [
  {
    id: "art-1",
    title: {
      en: "Demystifying CAN FD: Transitioning from Classic CAN in Safety-Critical ECUs",
      de: "CAN FD in der Praxis: Der Übergang von Classic CAN in sicherheitskritischen Steuergeräten"
    },
    summary: {
      en: "A comprehensive technical breakdown of dual bit-rate switching, transceiver delay compensation (TDC), and preserving ISO 26262 ASIL-B requirements under 5 Mbps bus traffic.",
      de: "Detaillierte Analyse der Umschaltung doppelter Bitraten, Transceiver Delay Compensation (TDC) und Erfüllung von ISO 26262 ASIL-B Anforderungen bei 5 Mbit/s."
    },
    date: "Engineering Insight",
    readTime: "7 min read",
    tags: ["CAN FD", "ISO 11898-1", "Automotive", "ASIL-B"],
    keyTakeaways: {
      en: [
        "Nominal vs. data bit rate timing calculation formulas with practical prescaler values for 80 MHz MCU clocks.",
        "Why Transceiver Delay Compensation (TDC) is mandatory when the loop delay exceeds one bit time at 5 Mbps.",
        "Hardware acceptance filtering strategies to keep CPU overhead below 5% under 85% bus utilization."
      ],
      de: [
        "Berechnungsformeln für Nominal- und Daten-Bitrate mit praxisnahen Prescaler-Werten für 80 MHz MCUs.",
        "Warum Transceiver Delay Compensation (TDC) zwingend erforderlich ist, wenn die Schleifenverzögerung eine Bitzeit überschreitet.",
        "Hardware-Akzeptanzfilter-Strategien, um die CPU-Auslastung selbst bei 85% Buslast unter 5% zu halten."
      ]
    }
  },
  {
    id: "art-2",
    title: {
      en: "Zero-Jitter Task Scheduling on FreeRTOS for Motor Control Loops",
      de: "Jitterfreie Task-Planung unter FreeRTOS für Motorregelkreise"
    },
    summary: {
      en: "How to configure Cortex-M SysTick priority, preemptive RTOS kernels, and hardware timer capture to achieve sub-microsecond control determinism.",
      de: "Optimierung von Cortex-M SysTick-Prioritäten, präemptiven RTOS-Kerneln und Timer-Captures für sub-mikrosekundengenaue Regelung."
    },
    date: "Firmware Architecture",
    readTime: "6 min read",
    tags: ["FreeRTOS", "Motor Control", "Cortex-M", "Real-Time"],
    keyTakeaways: {
      en: [
        "Separating the ultra-fast ADC PWM current loop inside hardware ISRs from supervisory RTOS telemetry tasks.",
        "Using direct task notifications instead of binary semaphores to save 45% context switch cycle latency.",
        "Stack watermark monitoring techniques to eliminate silent stack overflow bugs in production firmware."
      ],
      de: [
        "Trennung des ultra-schnellen ADC-PWM-Stromregelkreises in Hardware-ISRs von überwachenden RTOS-Telemetrie-Tasks.",
        "Nutzung direkter Task-Notifications statt binärer Semaphore zur Einsparung von 45% Kontextwechsel-Zyklen.",
        "Stack-Watermark-Überwachung zur sicheren Vermeidung unbemerkter Stack-Überläufe in Produktionsfirmware."
      ]
    }
  },
  {
    id: "art-3",
    title: {
      en: "Sensor Fusion for Autonomous Robotics: IMU + LiDAR Integration on Cortex-M7",
      de: "Sensorfusion für autonome Robotik: IMU- und LiDAR-Integration auf Cortex-M7"
    },
    summary: {
      en: "Architecting a real-time Extended Kalman Filter (EKF) pipeline on bare-metal Cortex-M7, fusing 6-DOF IMU data with 2D LiDAR point clouds for robust robot localization under 1 ms cycle budgets.",
      de: "Architektur einer Echtzeit-EKF-Pipeline auf Bare-Metal Cortex-M7: Fusion von 6-DOF-IMU-Daten mit 2D-LiDAR-Punktwolken für robuste Roboterlokalisierung unter 1 ms Zyklusbudget."
    },
    date: "Robotics & Firmware",
    readTime: "9 min read",
    tags: ["Sensor Fusion", "EKF", "Cortex-M7", "Robotics", "LiDAR"],
    keyTakeaways: {
      en: [
        "Implementing a fixed-point Extended Kalman Filter on Cortex-M7 using CMSIS-DSP matrix ops to achieve 800 µs worst-case fusion cycles.",
        "DMA-driven SPI acquisition of an ICM-42688-P IMU at 1 kHz and UART ingestion of RPLiDAR scan frames without blocking the control loop.",
        "Covariance tuning strategies for dynamic environments: adapting process noise matrices when wheel odometry diverges from IMU-predicted heading."
      ],
      de: [
        "Festkomma-EKF auf Cortex-M7 mit CMSIS-DSP-Matrixoperationen für 800 µs Worst-Case-Fusionszyklen.",
        "DMA-gesteuerter SPI-Empfang eines ICM-42688-P IMU bei 1 kHz und UART-Einlesen von RPLiDAR-Scan-Frames ohne Blockierung der Regelschleife.",
        "Kovarianz-Tuning für dynamische Umgebungen: Anpassung der Prozessrauschmatrizen bei Divergenz zwischen Rad-Odometrie und IMU-Kurs."
      ]
    }
  },
  {
    id: "art-4",
    title: {
      en: "Building a Custom Yocto BSP for Automotive-Grade SoCs: Device Trees, Kernel Modules & OTA",
      de: "Erstellung eines maßgeschneiderten Yocto-BSP für Automotive-SoCs: Device Trees, Kernel-Module und OTA"
    },
    summary: {
      en: "End-to-end guide to creating a production-grade Embedded Linux BSP with Yocto Project — from writing device tree overlays and out-of-tree kernel modules to integrating A/B OTA update partitioning for fail-safe field upgrades.",
      de: "Vollständiger Leitfaden zur Erstellung eines produktionsreifen Embedded-Linux-BSP mit dem Yocto Project — von Device-Tree-Overlays und externen Kernel-Modulen bis hin zu A/B-OTA-Update-Partitionierung für ausfallsichere Feldaktualisierungen."
    },
    date: "Embedded Linux",
    readTime: "10 min read",
    tags: ["Yocto", "Embedded Linux", "Device Trees", "Kernel Modules", "OTA Updates"],
    keyTakeaways: {
      en: [
        "Structuring a custom Yocto meta-layer with machine configs, distro policies, and recipe overrides for NXP i.MX8 and TI AM62x automotive SoCs.",
        "Writing device tree overlays to remap SPI/I2C peripherals and configure CAN FD controller nodes without touching the upstream kernel source.",
        "Implementing SWUpdate-based dual A/B root filesystem partitioning with cryptographic image signing for tamper-proof over-the-air firmware delivery."
      ],
      de: [
        "Aufbau eines Custom Yocto Meta-Layers mit Machine-Configs, Distro-Policies und Recipe-Overrides für NXP i.MX8 und TI AM62x Automotive-SoCs.",
        "Device-Tree-Overlays zur Neuzuordnung von SPI/I2C-Peripherie und Konfiguration von CAN-FD-Controller-Knoten ohne Änderung des Upstream-Kernels.",
        "SWUpdate-basierte duale A/B-Rootfs-Partitionierung mit kryptographischer Image-Signierung für manipulationssichere OTA-Firmware-Updates."
      ]
    }
  },
  {
    id: "art-5",
    title: {
      en: "Embedded Robotics with micro-ROS: Real-Time Motor Control on Cortex-M7",
      de: "Embedded-Robotik mit micro-ROS: Echtzeit-Motorsteuerung auf Cortex-M7"
    },
    summary: {
      en: "Bridging ROS 2 and bare-metal embedded systems using micro-ROS on STM32H7 — from configuring the XRCE-DDS transport layer over UART/USB to implementing closed-loop PID motor control with real-time encoder feedback in a FreeRTOS task.",
      de: "Verbindung von ROS 2 und Bare-Metal-Embedded-Systemen mittels micro-ROS auf STM32H7 — von der Konfiguration der XRCE-DDS-Transportschicht über UART/USB bis hin zur geschlossenen PID-Motorsteuerung mit Echtzeit-Encoder-Rückkopplung in einem FreeRTOS-Task."
    },
    date: "Robotics & Embedded",
    readTime: "8 min read",
    tags: ["micro-ROS", "ROS 2", "STM32H7", "FreeRTOS", "Motor Control", "Robotics"],
    keyTakeaways: {
      en: [
        "Running the micro-ROS client on STM32H7 with FreeRTOS (agent on the ROS 2 host), including XRCE-DDS serialization over UART for sub-5 ms publish latency to the ROS 2 navigation stack.",
        "Implementing hardware-timer quadrature encoder capture combined with DMA-driven PWM output for jitter-free closed-loop velocity PID at 1 kHz update rate.",
        "Designing a deterministic task architecture that isolates safety-critical motor control (highest-priority 1 kHz task) from ROS 2 topic publishing (lower-priority RTOS task) to guarantee hard real-time deadlines."
      ],
      de: [
        "Betrieb des micro-ROS-Clients auf STM32H7 mit FreeRTOS (Agent auf dem ROS 2-Host), einschließlich XRCE-DDS-Serialisierung über UART für sub-5 ms Publish-Latenz zum ROS 2 Navigationsstack.",
        "Implementierung hardware-timer-basierter Quadratur-Encoder-Erfassung in Kombination mit DMA-gesteuertem PWM-Ausgang für jitterfreie geschlossene Geschwindigkeits-PID-Regelung bei 1 kHz Updaterate.",
        "Entwurf einer deterministischen Task-Architektur, die sicherheitskritische Motorsteuerung (höchstpriorer 1-kHz-Task) von ROS 2 Topic-Publishing (niedrigprioritärer RTOS-Task) isoliert, um harte Echtzeit-Deadlines zu garantieren."
      ]
    }
  }
];

export const CAN_SIMULATOR_FRAMES: CANFrame[] = [
  {
    id: "0x180",
    name: "POWERTRAIN_ENGINE_RPM",
    dlc: 8,
    data: ["0x17", "0x70", "0x00", "0x64", "0x2D", "0x00", "0x00", "0x8A"],
    cycleTimeMs: 10,
    decoded: [
      { signal: "Engine RPM", value: 6000, unit: "RPM" },
      { signal: "Throttle Position", value: 100, unit: "%" },
      { signal: "Coolant Temp", value: 88, unit: "°C" }
    ],
    timestamp: "0.010 s",
    count: 0
  },
  {
    id: "0x2A4",
    name: "BMS_PACK_STATUS",
    dlc: 8,
    data: ["0x01", "0x94", "0x03", "0xE8", "0x00", "0x19", "0x62", "0x4F"],
    cycleTimeMs: 50,
    decoded: [
      { signal: "Pack Voltage", value: 404.2, unit: "V" },
      { signal: "Pack Current", value: 24.5, unit: "A" },
      { signal: "State of Charge", value: 98, unit: "%" }
    ],
    timestamp: "0.050 s",
    count: 0
  },
  {
    id: "0x310",
    name: "VEHICLE_WHEEL_SPEED",
    dlc: 8,
    data: ["0x03", "0xE8", "0x03", "0xE8", "0x03", "0xE7", "0x03", "0xE9"],
    cycleTimeMs: 20,
    decoded: [
      { signal: "Front Left Speed", value: 100.0, unit: "km/h" },
      { signal: "Front Right Speed", value: 100.0, unit: "km/h" },
      { signal: "Rear Left Speed", value: 99.9, unit: "km/h" },
      { signal: "Rear Right Speed", value: 100.1, unit: "km/h" }
    ],
    timestamp: "0.020 s",
    count: 0
  },
  {
    id: "0x420",
    name: "CHASSIS_STEERING_ANGLE",
    dlc: 4,
    data: ["0x00", "0x12", "0x01", "0xC4"],
    cycleTimeMs: 20,
    decoded: [
      { signal: "Steering Angle", value: 1.8, unit: "deg" },
      { signal: "Steering Velocity", value: 45.2, unit: "deg/s" }
    ],
    timestamp: "0.020 s",
    count: 0
  },
  {
    id: "0x7E8",
    name: "UDS_DIAGNOSTIC_RESPONSE",
    dlc: 8,
    data: ["0x03", "0x62", "0xF1", "0x90", "0xAA", "0x55", "0x00", "0x00"],
    cycleTimeMs: 100,
    decoded: [
      { signal: "Service Response", value: "0x62 (ReadDataByIdentifier)", unit: "UDS" },
      { signal: "DID Parameter", value: "0xF190 (VIN Query)", unit: "HEX" },
      { signal: "Status", value: "POSITIVE_ACK", unit: "ISO 14229" }
    ],
    timestamp: "0.100 s",
    count: 0
  }
];
